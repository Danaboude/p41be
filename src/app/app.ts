import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { HeaderComponent } from './shared/layout/header/header';
import { FooterComponent } from './shared/layout/footer/footer';
import { NotificationComponent } from './shared/components/notification/notification';
import { SeoService } from './core/services/seo.service';
import { TranslationService } from './core/services/translation.service';
import { effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private seoService = inject(SeoService);
  private translationService = inject(TranslationService);
  
  // Track if current route is an admin route
  isAdminView = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects.startsWith('/admin'))
    ),
    { initialValue: this.router.url.startsWith('/admin') }
  );

  constructor() {
    // Automatically update SEO tags when route or language changes
    effect(() => {
      const currentLang = this.translationService.lang();
      const t = this.translationService.t();
      
      // Trigger update on NavigationEnd
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.updateSeo(t);
      });

      // Initial update
      this.updateSeo(t);
    });
  }

  private updateSeo(t: any) {
    let route = this.activatedRoute.firstChild;
    while (route?.firstChild) {
      route = route.firstChild;
    }

    const seoKey = route?.snapshot.data['seoKey'];
    if (seoKey && t.seo && t.seo[seoKey]) {
      this.seoService.updateSeoTags({
        title: t.seo[seoKey].title,
        description: t.seo[seoKey].description
      });
    }
  }
}
