import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class AboutComponent {
  private translationService = inject(TranslationService);
  private router = inject(Router);
  t = this.translationService.t;

  navigateToConsultancy() {
    this.router.navigate(['/consultancy']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  clients = [
    { name: 'CNH Industrial', logo: 'logos clints/cnh.png' },
    { name: 'Petersime', logo: 'logos clints/petersime.png' },
    { name: 'RAL', logo: 'logos clints/ral.png' },
    { name: 'Smart Logistics', logo: 'logos clints/smart logistics.png' },
    { name: 'TML', logo: 'logos clints/tml.png' },
    { name: 'Volvo', logo: 'logos clints/volvo.png' }
  ];
}
