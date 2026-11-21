import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslationService } from '../../core/services/translation.service';
import { WhyChooseComponent } from '../home/sections/why-choose/why-choose';
import { TEAMPLANNER_CONTENT } from './teamplanner.content';

@Component({
  selector: 'app-teamplanner',
  standalone: true,
  imports: [CommonModule, WhyChooseComponent],
  templateUrl: './teamplanner.html'
})
export class TeamPlannerComponent {
  private translationService = inject(TranslationService);
  private router = inject(Router);

  private sanitizer = inject(DomSanitizer);

  // Sales film: paste the Vimeo player URL here once approved, e.g.
  // 'https://player.vimeo.com/video/<id>?h=<hash>&title=0&byline=0&portrait=0&badge=0&dnt=1'
  private readonly filmSrc: string | null = null;
  filmUrl: SafeResourceUrl | null = this.filmSrc ? this.sanitizer.bypassSecurityTrustResourceUrl(this.filmSrc) : null;

  c = computed(() => TEAMPLANNER_CONTENT[this.translationService.lang()]);
  openFaq = 0;

  private scrollToTop() {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateToContact() {
    this.router.navigate(['/contact']).then(() => this.scrollToTop());
  }

  navigateToTimeStudy() {
    this.router.navigate(['/time-study']).then(() => this.scrollToTop());
  }
}
