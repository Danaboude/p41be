import { Component, inject, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BooksComponent } from './sections/books/books';
import { BlogSectionComponent } from './sections/blog/blog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BooksComponent, BlogSectionComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnDestroy {
  private translationService = inject(TranslationService);
  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);

  t = this.translationService.t;
  activeVideo = signal<string | null>(null);

  /** Controls CSS animation-play-state on the carousel track */
  carouselPaused = signal(false);

  clients = [
    { name: 'CNH', logo: 'logos clints/cnh.png' },
    { name: 'Petersime', logo: 'logos clints/petersime.png' },
    { name: 'RAL', logo: 'logos clints/ral.png' },
    { name: 'Smart Logistics', logo: 'logos clints/smart logistics.png' },
    { name: 'TML', logo: 'logos clints/tml.png' },
    { name: 'Volvo', logo: 'logos clints/volvo.png' }
  ];

  videos = [
    { id: 'prKQoH93dSM', title: 'Industrial Strategy in Practice',      thumbnail: 'https://img.youtube.com/vi/prKQoH93dSM/hqdefault.jpg' },
    { id: '4igyrDqrCDo', title: 'Operational Excellence Keynote',        thumbnail: 'https://img.youtube.com/vi/4igyrDqrCDo/hqdefault.jpg' },
    { id: '2Nls5kkqYeo', title: 'Lean Manufacturing Insights',           thumbnail: 'https://img.youtube.com/vi/2Nls5kkqYeo/hqdefault.jpg' },
    { id: 'WBnHxlVSr1I', title: 'Future of Industrial Engineering',      thumbnail: 'https://img.youtube.com/vi/WBnHxlVSr1I/hqdefault.jpg' },
    { id: 'igsNEOm6Xcc', title: 'Process Optimization Workshop',         thumbnail: 'https://img.youtube.com/vi/igsNEOm6Xcc/hqdefault.jpg' },
    { id: '7eUloohokjc', title: 'Leadership in Engineering',             thumbnail: 'https://img.youtube.com/vi/7eUloohokjc/hqdefault.jpg' },
    { id: '2PJzXcsdCtw', title: 'The Goal — Theory of Constraints',      thumbnail: 'https://img.youtube.com/vi/2PJzXcsdCtw/hqdefault.jpg' },
    { id: '4KFfxETqfnU', title: 'Innovation & Structured Thinking',      thumbnail: 'https://img.youtube.com/vi/4KFfxETqfnU/hqdefault.jpg' }
  ];

  navigateToAbout() {
    this.router.navigate(['/about']).then(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  navigateToConsultancy() {
    this.router.navigate(['/consultancy']).then(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  navigateToAcademy() {
    this.router.navigate(['/academy']).then(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  pauseCarousel()  { this.carouselPaused.set(true);  }
  resumeCarousel() { this.carouselPaused.set(false); }

  playVideo(id: string) {
    this.activeVideo.set(id);
    this.pauseCarousel();
  }

  closeVideo() {
    this.activeVideo.set(null);
    this.resumeCarousel();
  }

  getSafeUrl(id: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
    );
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img.src.includes('hqdefault')) {
      img.src = img.src.replace('hqdefault', 'mqdefault');
    }
  }

  ngOnDestroy() {}
}
