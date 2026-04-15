import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  t = this.translationService.t;

  clients = [
    { name: 'CNH Industrial', logo: 'logos clints/cnh.png' },
    { name: 'Petersime', logo: 'logos clints/petersime.png' },
    { name: 'RAL', logo: 'logos clints/ral.png' },
    { name: 'Smart Logistics', logo: 'logos clints/smart logistics.png' },
    { name: 'TML', logo: 'logos clints/tml.png' },
    { name: 'Volvo', logo: 'logos clints/volvo.png' }
  ];
}
