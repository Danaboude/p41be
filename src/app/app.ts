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
import { TIME_STUDY_CONTENT } from './pages/time-study/time-study.content';
import { TEAMPLANNER_CONTENT } from './pages/teamplanner/teamplanner.content';
import { TEAMPLANNER_FILM_TRANSCRIPT } from './pages/teamplanner/teamplanner.film-transcript';
import { FILM_TRANSCRIPTS } from './pages/time-study/time-study.film-transcript';
import { SITE_FILMS, SITE_ORIGIN, isoDuration } from './core/films';

const ORG_REF = { '@type': 'Organization', '@id': 'https://www.p41.be/#organization', name: 'P41 Industrial Intelligence', url: 'https://www.p41.be' };
const faqPage = (url: string, items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  '@id': url + '#faq',
  mainEntity: items.map(i => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } }))
});
const TRANSCRIPTS: Record<string, string> = {
  linebalance: FILM_TRANSCRIPTS.linebalance.en,
  price: FILM_TRANSCRIPTS.price.en,
  firstday: FILM_TRANSCRIPTS.firstday.en,
  teamplanner: TEAMPLANNER_FILM_TRANSCRIPT
};
const videoObjects = (page: string) => SITE_FILMS.filter(f => f.page === page).map(f => ({
  '@type': 'VideoObject',
  '@id': `${SITE_ORIGIN}${f.page}#${f.anchor}`,
  name: f.name,
  description: f.description,
  thumbnailUrl: SITE_ORIGIN + f.poster,
  contentUrl: SITE_ORIGIN + f.file,
  uploadDate: f.uploadDate,
  duration: isoDuration(f.durationSec),
  inLanguage: 'en',
  isFamilyFriendly: true,
  transcript: TRANSCRIPTS[f.id],
  publisher: ORG_REF
}));
const TS = TIME_STUDY_CONTENT.en;
const TP = TEAMPLANNER_CONTENT.en;

// Page-specific structured data (schema.org). Keyed by route `seoKey`.
// Kept language-neutral and centralized so it survives the NavigationEnd re-sync in updateSeo().
const JSON_LD_BY_SEO_KEY: Record<string, any> = {
  timeStudy: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.p41.be/time-study#software',
        name: 'Time Study',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Time study and line balancing software',
        operatingSystem: 'Web',
        description: TS.desc,
        url: 'https://www.p41.be/time-study',
        image: 'https://www.p41.be/time-study/station-balance-chart.webp',
        screenshot: TS.features.map(f => 'https://www.p41.be' + f.shot.src),
        featureList: TS.features.map(f => f.title),
        inLanguage: ['en', 'nl'],
        brand: { '@type': 'Brand', name: 'P41 Industrial Intelligence' },
        provider: ORG_REF
      },
      ...videoObjects('/time-study'),
      faqPage('https://www.p41.be/time-study', TS.faq)
    ]
  },
  teamPlanner: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.p41.be/teamplanner#software',
        name: 'TeamPlanner',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Field crew and workforce scheduling software',
        operatingSystem: 'Web',
        description: TP.desc,
        url: 'https://www.p41.be/teamplanner',
        image: 'https://www.p41.be' + TP.hero_shot.src,
        screenshot: [TP.hero_shot, TP.card_shot, ...TP.warn.map(w => w.shot)].map(x => 'https://www.p41.be' + x.src),
        featureList: [...TP.drag, ...TP.warn, ...TP.invoice].map(x => x.title),
        inLanguage: ['en', 'nl'],
        brand: { '@type': 'Brand', name: 'P41 Industrial Intelligence' },
        provider: ORG_REF
      },
      ...videoObjects('/teamplanner'),
      faqPage('https://www.p41.be/teamplanner', TP.faq)
    ]
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
    const url = this.router.url;
    const isPrivate = url.startsWith('/admin') || url.startsWith('/academy/access') || !!route?.snapshot.data['noindex'];
    this.meta.updateTag({ name: 'robots', content: isPrivate ? 'noindex, nofollow' : 'index, follow' });
    if (isPrivate) return;
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
