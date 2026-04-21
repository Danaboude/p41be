import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  private translationService = inject(TranslationService);
  private router = inject(Router);
  t = this.translationService.t;

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  isAcademy = computed(() => this.currentUrl().startsWith('/academy'));
  isBlog = computed(() => this.currentUrl().startsWith('/blog'));
  isAbout = computed(() => this.currentUrl().startsWith('/about'));
  isConsultancy = computed(() => this.currentUrl().startsWith('/consultancy'));
  isContact = computed(() => this.currentUrl().startsWith('/contact'));

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  navigateToPrivacy() {
    this.router.navigate(['/privacy']).then(() => this.scrollToTop());
  }

  navigateHome() {
    this.router.navigate(['']).then(() => this.scrollToTop());
  }
}

