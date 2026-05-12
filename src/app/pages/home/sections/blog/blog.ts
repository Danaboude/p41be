import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../../core/services/translation.service';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css']
})
export class BlogSectionComponent implements OnInit {
  private translationService = inject(TranslationService);
  private dataService = inject(DataService);
  
  t = this.translationService.t;
  realPosts = signal<any[]>([]);

  ngOnInit() {
    this.dataService.getBlogPosts().subscribe({
      next: (posts) => {
        if (posts && posts.length > 0) {
          this.realPosts.set(posts.slice(0, 3));
        }
      }
    });
  }

  blogs = computed(() => {
    const currentRealPosts = this.realPosts();
    
    if (currentRealPosts.length > 0) {
      return currentRealPosts.map(post => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        image: post.image || 'blog1.png',
        date: post.date,
        readTime: post.readTime
      }));
    }

    // Fallback to translated mock data if no real posts exist yet
    const tPosts = this.t().home.blog.posts;
    return [
      {
        id: 'getting-back-to-basics',
        slug: 'getting-back-to-basics',
        title: tPosts[0].title,
        excerpt: tPosts[0].excerpt,
        image: 'blog1.png',
        date: 'Jan 2, 2023',
        readTime: '5 min read'
      },
      {
        id: 'where-should-companies-focus-on-to-stay-competitive',
        slug: 'where-should-companies-focus-on-to-stay-competitive',
        title: tPosts[1].title,
        excerpt: tPosts[1].excerpt,
        image: 'blog2.png',
        date: 'Nov 20, 2022',
        readTime: '4 min read'
      },
      {
        id: 'why-doing-a-lot-of-improvements-might-work-against-you',
        slug: 'why-doing-a-lot-of-improvements-might-work-against-you',
        title: tPosts[2].title,
        excerpt: tPosts[2].excerpt,
        image: 'blog3.jpg',
        date: 'Jan 8, 2021',
        readTime: '6 min read'
      }
    ];
  });
}
