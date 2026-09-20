import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
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

// Page-specific structured data (schema.org). Keyed by route `seoKey`.
// Kept language-neutral and centralized so it survives the NavigationEnd re-sync in updateSeo().
const JSON_LD_BY_SEO_KEY: Record<string, any> = {
  timeStudy: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Time Study',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Industrial Engineering / Lean Manufacturing Software',
    operatingSystem: 'Web',
    description: 'Line-balancing, time-study, and production-costing workbench that turns a station-by-station work breakdown into takt time, balance loss %, and unit cost.',
    url: 'https://www.p41.be/time-study',
    image: 'https://www.p41.be/banner.jpg',
    brand: { '@type': 'Brand', name: 'P41 Industrial Intelligence' },
    offers: { '@type': 'Offer', priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: 'https://www.p41.be/time-study' },
    provider: { '@type': 'Organization', name: 'P41 Industrial Intelligence', url: 'https://www.p41.be' }
  },
  teamPlanner: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TeamPlanner',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Field Service & Workforce Scheduling Software',
    operatingSystem: 'Web',
    description: 'Workforce scheduling for field crews plan jobs, staff them with the right people and vehicles, track attendance, and invoice real cost, all from one board.',
    url: 'https://www.p41.be/teamplanner',
    image: 'https://www.p41.be/banner.jpg',
    brand: { '@type': 'Brand', name: 'P41 Industrial Intelligence' },
    offers: { '@type': 'Offer', priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: 'https://www.p41.be/teamplanner' },
    provider: { '@type': 'Organization', name: 'P41 Industrial Intelligence', url: 'https://www.p41.be' }
  }
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private document = inject(DOCUMENT);
  private meta = inject(Meta);
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
    effect((onCleanup) => {
      const currentLang = this.translationService.lang();
      const t = this.translationService.t();
      
      // Trigger update on NavigationEnd
      const subscription = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.updateSeo(t);
      });

      onCleanup(() => subscription.unsubscribe());
      // Initial update
      this.updateSeo(t);
    });
  }

  private updateSeo(t: any) {
    let route = this.activatedRoute.firstChild;
    while (route?.firstChild) {
      route = route.firstChild;
    }

    this.document.documentElement.lang = this.translationService.lang();
    const isAdmin = this.router.url.startsWith('/admin');
    this.meta.updateTag({ name: 'robots', content: isAdmin ? 'noindex, nofollow' : 'index, follow' });
    if (route?.snapshot.paramMap.has('slug')) return;
    const seoKey = route?.snapshot.data['seoKey'];
    if (seoKey && t.seo && t.seo[seoKey]) {
      this.seoService.updateSeoTags({
        title: t.seo[seoKey].title,
        description: t.seo[seoKey].description,
        jsonLd: JSON_LD_BY_SEO_KEY[seoKey]
      });
    }
  }
}
