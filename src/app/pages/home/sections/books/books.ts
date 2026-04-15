import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  readonly booksUrl = 'https://factoryofthecustomer.eu/books';


}
