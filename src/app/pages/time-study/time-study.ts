import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslationService } from '../../core/services/translation.service';
import { WhyChooseComponent } from '../home/sections/why-choose/why-choose';

@Component({
  selector: 'app-time-study',
  standalone: true,
  imports: [CommonModule, WhyChooseComponent],
  templateUrl: './time-study.html'
})
export class TimeStudyComponent {
  private translationService = inject(TranslationService);
  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);

  t = this.translationService.t;

  videoUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://player.vimeo.com/video/1186302296?h=424166036c'
  );

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateToContact() {
    this.router.navigate(['/contact']).then(() => this.scrollToTop());
  }

  navigateToTeamPlanner() {
    this.router.navigate(['/teamplanner']).then(() => this.scrollToTop());
  }
}
