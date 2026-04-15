import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { inject, signal } from '@angular/core';

@Component({
  selector: 'app-about-p41',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-p41.html',
  styleUrls: ['./about-p41.css']
})
export class AboutP41Component {
  private sanitizer = inject(DomSanitizer);

  videoPlaying = signal(false);

  readonly videoId = 'aImgmFJ4_w4';
  readonly thumbnail = `https://img.youtube.com/vi/${this.videoId}/maxresdefault.jpg`;

  get safeVideoUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.videoId}?autoplay=1&rel=0&modestbranding=1`
    );
  }

  stats = [
    { value: '10x',  label: 'Typical Client ROI' },
    { value: '30%',  label: 'Efficiency Improvement' },
    { value: '<1yr', label: 'Return on Investment' },
    { value: '25+',  label: 'Years of Expertise' }
  ];

  technologies = [
    { icon: 'psychology',          label: 'Artificial Intelligence' },
    { icon: 'sensors',             label: 'Internet of Things' },
    { icon: 'precision_manufacturing', label: 'Cobots & Robotics' },
    { icon: 'account_tree',        label: 'Robotic Process Automation' }
  ];
}
