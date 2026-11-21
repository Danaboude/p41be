import { Injectable, inject, mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { FetchBackend, HttpBackend, HttpEvent, HttpRequest } from '@angular/common/http';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { Observable } from 'rxjs';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

// Prerendering runs at build time with no local API, so /api calls are sent to the live site.
// This is done in the backend (after all interceptors) so the HTTP transfer cache keeps the
// relative URL as its key and the browser reuses the prerendered data instead of fetching again.
const API_ORIGIN = 'https://www.p41.be';

@Injectable()
class LiveApiBackend implements HttpBackend {
  private fetchBackend = inject(FetchBackend);

  handle(req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    const url = new URL(req.url, 'http://prerender.local');
    if (url.pathname.startsWith('/api/')) {
      req = req.clone({ url: API_ORIGIN + url.pathname + url.search });
    }
    return this.fetchBackend.handle(req);
  }
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    { provide: HttpBackend, useClass: LiveApiBackend }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
