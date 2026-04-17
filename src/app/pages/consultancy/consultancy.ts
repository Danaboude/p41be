import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';
import { WhyChooseComponent } from '../home/sections/why-choose/why-choose';

@Component({
  selector: 'app-consultancy',
  standalone: true,
  imports: [CommonModule, WhyChooseComponent],
  templateUrl: './consultancy.html'
})
export class ConsultancyComponent {
  private translationService = inject(TranslationService);
  t = this.translationService.t;
}
