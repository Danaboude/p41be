import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  t = this.translationService.t;
  currentLang = this.translationService.lang;

  switchLang() {
    const nextLang = this.currentLang() === 'en' ? 'nl' : 'en';
    this.translationService.setLang(nextLang);
  }
}
