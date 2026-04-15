import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css']
})
export class BlogSectionComponent {
  blogs = [
    {
      id: 'getting-back-to-basics',
      title: 'Getting back to basics',
      excerpt: 'We are looking at the year 1910. More than 113 years ago! A brilliant analyst called Frank B Gilbreth started using film cameras to look for waste in motions...',
      image: 'blog1.png',
      date: 'Jan 2, 2023',
      readTime: '5 min read'
    },
    {
      id: 'where-should-companies-focus-on-to-stay-competitive',
      title: 'Where should companies focus on to stay competitive?',
      excerpt: 'A straight forward answer would be to offer the lowest price which convinces customers to buy the product. However I think there is more to focus on...',
      image: 'blog2.png',
      date: 'Nov 20, 2022',
      readTime: '4 min read'
    },
    {
      id: 'why-doing-a-lot-of-improvements-might-work-against-you',
      title: 'Why Doing a Lot of Improvements in your Company Might Work Against You!',
      excerpt: 'Clarifying some misunderstandings about doing too many improvements in your company. Doing a lot of improvements does NOT mean that you save money...',
      image: 'blog3.jpg',
      date: 'Jan 8, 2021',
      readTime: '6 min read'
    }
  ];
}
