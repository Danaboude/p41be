import { Component, inject, computed, signal } from '@angular/core';
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
  public translationService = inject(TranslationService);
  private router = inject(Router);
  t = this.translationService.t;
  currentLang = this.translationService.lang;

  isMobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

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

  /** True when on /consultancy route */
  isConsultancy = computed(() => this.currentUrl().startsWith('/consultancy'));

  /** True when on /contact route */
  isContact = computed(() => this.currentUrl().startsWith('/contact'));

  /** True when on /time-study route */
  isTimeStudy = computed(() => this.currentUrl().startsWith('/time-study'));

  /** True when on /teamplanner route */
  isTeamPlanner = computed(() => this.currentUrl().startsWith('/teamplanner'));

  /** True when on any product page, used to highlight the "Products" nav item */
  isProducts = computed(() => this.isTimeStudy() || this.isTeamPlanner());

  switchLang() {
    const nextLang = this.currentLang() === 'en' ? 'nl' : 'en';
    this.translationService.setLang(nextLang);
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.isMobileMenuOpen.set(false);
  }

  navigateToConsultancy() {
    this.router.navigate(['/consultancy']).then(() => this.scrollToTop());
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

  navigateToContact() {
    this.router.navigate(['/contact']).then(() => this.scrollToTop());
  }

  navigateToTimeStudy() {
    this.router.navigate(['/time-study']).then(() => this.scrollToTop());
  }

  navigateToTeamPlanner() {
    this.router.navigate(['/teamplanner']).then(() => this.scrollToTop());
  }

  navigateHome() {
    this.router.navigate(['']).then(() => this.scrollToTop());
  }
}

