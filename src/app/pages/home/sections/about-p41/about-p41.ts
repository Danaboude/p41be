import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { inject, signal, computed } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-about-p41',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-p41.html',
  styleUrls: ['./about-p41.css']
})
export class AboutP41Component {
  private sanitizer = inject(DomSanitizer);
  private translationService = inject(TranslationService);
  t = this.translationService.t;

  videoPlaying = signal(false);

  readonly videoId = 'aImgmFJ4_w4';
  readonly thumbnail = `https://img.youtube.com/vi/${this.videoId}/maxresdefault.jpg`;

  get safeVideoUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.videoId}?autoplay=1&rel=0&modestbranding=1`
    );
  }

  stats = computed(() => {
    const s = this.t().about_p41.stats;
    return [
      { value: '25+', label: s.years },
      { value: '150+', label: s.facilities },
      { value: '3', label: s.continents },
      { value: '10x', label: s.roi }
    ];
  });

  technologies = computed(() => {
    const tech = this.t().about_p41.technologies;
    return [
      { icon: 'precision_manufacturing', label: tech.lean },
      { icon: 'account_tree', label: tech.flow },
      { icon: 'factory', label: tech.smart },
      { icon: 'sensors', label: tech.iot },
      { icon: 'verified_user', label: tech.quality },
      { icon: 'local_shipping', label: tech.logistics },
      { icon: 'school', label: tech.training },
      { icon: 'psychology', label: tech.ai }
    ];
  });
}
