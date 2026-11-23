import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslationService } from '../../core/services/translation.service';

// "The Customer's Truffle" book video (moved here from the Time Study page: it is about Ives's book,
// not about the software). Copy based on the blog post of the same name.
const BOOK = {
  en: {
    tag: 'The book',
    title: "The Customer's Truffle",
    text: "Ives De Saeger's book on a simple question: how can an organisation deliver what its customers ask for? It shows how to adapt the inside to deliver what is needed on the outside, mixing new technology with older, almost forgotten ways of understanding how an organisation works. A journey through technology, quality, knowledge management and organisational development.",
    blog: 'Read the blog post',
    order: 'See the books'
  },
  nl: {
    tag: 'Het boek',
    title: "The Customer's Truffle",
    text: 'Het boek van Ives De Saeger over een eenvoudige vraag: hoe levert een organisatie wat haar klanten vragen? Het toont hoe je de binnenkant aanpast om aan de buitenkant te leveren wat nodig is, met een mix van nieuwe technologie en oudere, bijna vergeten manieren om te begrijpen hoe een organisatie werkt. Een reis door technologie, kwaliteit, kennismanagement en organisatieontwikkeling.',
    blog: 'Lees de blogpost',
    order: 'Bekijk de boeken'
  }
};

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class AboutComponent {
  private translationService = inject(TranslationService);
  private router = inject(Router);
  t = this.translationService.t;
  private sanitizer = inject(DomSanitizer);
  book = computed(() => BOOK[this.translationService.lang()]);
  booksUrl = 'https://factoryofthecustomer.eu/books';
  bookVideo: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://player.vimeo.com/video/1186302296?h=424166036c&title=0&byline=0&portrait=0&badge=0&dnt=1'
  );

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
