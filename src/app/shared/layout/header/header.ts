import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  private translationService = inject(TranslationService);
  private router = inject(Router);
  t = this.translationService.t;
  currentLang = this.translationService.lang;

  /** Track current URL to detect academy pages */
  private currentUrl = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  /** True when on any /academy route */
  isAcademy = computed(() => this.currentUrl().startsWith('/academy'));

  /** True when on /blog route */
  isBlog = computed(() => this.currentUrl().startsWith('/blog'));

  /** True when on /about route */
  isAbout = computed(() => this.currentUrl().startsWith('/about'));

  switchLang() {
    const nextLang = this.currentLang() === 'en' ? 'nl' : 'en';
    this.translationService.setLang(nextLang);
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateToConsultancy() {
    this.router.navigate([''], { fragment: 'ready-to-evolve' }).then(() => {
      setTimeout(() => {
        const el = document.getElementById('ready-to-evolve');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }

  navigateToAcademy() {
    this.router.navigate(['/academy']).then(() => this.scrollToTop());
  }

  navigateToBlog() {
    this.router.navigate(['/blog']).then(() => this.scrollToTop());
  }

  navigateToAbout() {
    this.router.navigate(['/about']).then(() => this.scrollToTop());
  }

  navigateHome() {
    this.router.navigate(['']).then(() => this.scrollToTop());
  }
}

