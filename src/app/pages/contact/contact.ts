import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html'
})
export class ContactComponent {
  private translationService = inject(TranslationService);
  t = this.translationService.t;
  
  submitted = signal(false);

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitted.set(true);
    // In a real app, you'd send this to an API
    setTimeout(() => {
      this.submitted.set(false);
    }, 5000);
  }
}
