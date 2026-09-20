import { registerLocaleData } from '@angular/common';
import nl from '@angular/common/locales/nl';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

registerLocaleData(nl, 'nl');

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
