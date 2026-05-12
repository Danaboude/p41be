import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../../core/services/translation.service';

interface Book {
  title: string;
  publisher: string;
  year: number;
  tagline: string;
  description: string;
  color: string;
  accentColor: string;
  icon: string;
  badge: string;
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.html',
  styleUrls: ['./books.css']
})
export class BooksComponent {
  private translationService = inject(TranslationService);
  t = this.translationService.t;
  booksUrl = 'https://www.aeriez.com/books';


}
