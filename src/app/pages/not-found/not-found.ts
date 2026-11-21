import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="min-h-[60vh] flex items-center justify-center px-6 py-32">
      <div class="text-center max-w-xl">
        <p class="text-[#D4A843] font-bold tracking-widest uppercase text-sm mb-4">404</p>
        <h1 class="text-4xl md:text-5xl font-black mb-6">Page not found</h1>
        <p class="text-lg mb-10">The page you are looking for does not exist or has moved.</p>
        <a routerLink="/" class="inline-block bg-[#D4A843] text-white font-bold px-8 py-4 rounded-2xl">Back to home</a>
      </div>
    </section>
  `
})
export class NotFoundComponent implements OnInit {
  private seo = inject(SeoService);
  ngOnInit() {
    this.seo.updateSeoTags({ title: 'Page not found | P41', description: 'This page could not be found.' });
  }
}
