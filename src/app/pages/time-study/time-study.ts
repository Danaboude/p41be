import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { WhyChooseComponent } from '../home/sections/why-choose/why-choose';
import { VideoPlayerComponent } from '../../shared/components/video-player/video-player';
import { TIME_STUDY_CONTENT, TIME_STUDY_SHOTS } from './time-study.content';
import { FILM_TRANSCRIPTS } from './time-study.film-transcript';

@Component({
  selector: 'app-time-study',
  standalone: true,
  imports: [CommonModule, WhyChooseComponent, VideoPlayerComponent],
  templateUrl: './time-study.html'
})
export class TimeStudyComponent {
  private translationService = inject(TranslationService);
  private router = inject(Router);

  c = computed(() => TIME_STUDY_CONTENT[this.translationService.lang()]);
  shots = TIME_STUDY_SHOTS;
  transcripts = computed(() => {
    const l = this.translationService.lang();
    return { linebalance: FILM_TRANSCRIPTS.linebalance[l], price: FILM_TRANSCRIPTS.price[l], firstday: FILM_TRANSCRIPTS.firstday[l] };
  });
  openFaq = 0;

  // Line balance film, self-hosted in public/time-study (Dutch subtitles burned in).
  film = { src: '/time-study/linebalance-film-720p.mp4', poster: '/time-study/linebalance-film-poster.webp' };

  private scrollToTop() {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateToContact() {
    this.router.navigate(['/contact']).then(() => this.scrollToTop());
  }

  navigateToTeamPlanner() {
    this.router.navigate(['/teamplanner']).then(() => this.scrollToTop());
  }
}
