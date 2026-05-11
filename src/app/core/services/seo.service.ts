import { Injectable, inject, RendererFactory2, ViewEncapsulation } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoOptions {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedDate?: string;
  section?: string;
  jsonLd?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private rendererFactory = inject(RendererFactory2);
  private renderer = this.rendererFactory.createRenderer(null, null);

  private readonly baseUrl = 'https://www.p41.be';

  updateSeoTags(options: SeoOptions) {
    const {
      title,
      description,
      keywords,
      image = 'https://www.p41.be/banner.jpg',
      url = this.document.URL,
      type = 'website',
      author = 'P41 Industrial Intelligence',
      publishedDate,
      section,
      jsonLd
    } = options;

    if (title) {
      this.title.setTitle(title);
      this.meta.updateTag({ name: 'title', content: title });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ name: 'twitter:title', content: title });
    }

    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ name: 'twitter:description', content: description });
    }

    if (keywords) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    }

    if (image) {
      this.meta.updateTag({ property: 'og:image', content: image });
      this.meta.updateTag({ name: 'twitter:image', content: image });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    }

    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: 'P41 Industrial Intelligence' });

    if (publishedDate) {
      this.meta.updateTag({ name: 'article:published_time', content: publishedDate });
    }

    if (section) {
      this.meta.updateTag({ name: 'article:section', content: section });
    }

    this.updateCanonicalUrl(url);

    if (jsonLd) {
      this.setJsonLd(jsonLd);
    } else {
      // Default Organization Schema
      this.setJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'P41 Industrial Intelligence',
        'url': 'https://www.p41.be',
        'logo': 'https://www.p41.be/logo.jpg',
        'sameAs': [
          'https://www.linkedin.com/company/p41-be'
        ],
        'contactPoint': {
          '@type': 'ContactPoint',
          'email': 'ives@p41.be',
          'contactType': 'customer service'
        }
      });
    }
  }

  private updateCanonicalUrl(url: string) {
    let head = this.document.getElementsByTagName('head')[0];
    let element: HTMLLinkElement | null = this.document.querySelector(`link[rel='canonical']`) || null;
    if (element === null) {
      element = this.renderer.createElement('link');
      this.renderer.setAttribute(element, 'rel', 'canonical');
      this.renderer.appendChild(head, element);
    }
    this.renderer.setAttribute(element, 'href', url);
  }

  private setJsonLd(data: any) {
    let script = this.document.getElementById('json-ld');
    if (script) {
      this.renderer.setProperty(script, 'text', JSON.stringify(data));
    } else {
      script = this.renderer.createElement('script');
      this.renderer.setAttribute(script, 'id', 'json-ld');
      this.renderer.setAttribute(script, 'type', 'application/ld+json');
      this.renderer.setProperty(script, 'text', JSON.stringify(data));
      this.renderer.appendChild(this.document.head, script);
    }
  }
}
