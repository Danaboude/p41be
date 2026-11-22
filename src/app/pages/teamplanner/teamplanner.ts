import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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

  // Sales film, self-hosted in public/teamplanner (Dutch subtitles burned in).
  film = { src: '/teamplanner/teamplanner-film-1080p.mp4', poster: '/teamplanner/teamplanner-film-poster.webp' };

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
