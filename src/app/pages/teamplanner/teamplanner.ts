import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { WhyChooseComponent } from '../home/sections/why-choose/why-choose';

@Component({
  selector: 'app-teamplanner',
  standalone: true,
  imports: [CommonModule, WhyChooseComponent],
  templateUrl: './teamplanner.html'
})
export class TeamPlannerComponent {
  private translationService = inject(TranslationService);
  private router = inject(Router);

  t = this.translationService.t;

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateToContact() {
    this.router.navigate(['/contact']).then(() => this.scrollToTop());
  }

  navigateToTimeStudy() {
    this.router.navigate(['/time-study']).then(() => this.scrollToTop());
  }
}
