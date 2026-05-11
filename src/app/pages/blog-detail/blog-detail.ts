import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { DataService } from '../../core/services/data.service';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author?: string;
  tags: string[];
  image: string;
  content: any;  // Can be string or array
  readTime: string;
}

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.html',
  styleUrls: ['./blog-detail.css']
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);
  private dataService = inject(DataService);

  post: BlogPost | null = null;
  allPosts: BlogPost[] = [];
  isLoading = signal(true);

  private posts: BlogPost[] = []; // Will be loaded from API

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadPost(slug);
      }
    });

    // Load others for related (only once)
    this.dataService.getBlogPosts().subscribe((posts: any[]) => {
      this.allPosts = posts;
    });
  }

  private loadPost(slug: string) {
    this.isLoading.set(true);
    this.post = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    console.log('Fetching Blog Post with ID/Slug:', slug);
    this.dataService.getBlogPost(slug).subscribe({
      next: (post: any) => {
        console.log('API Response for Post:', post);
        if (post) {
          // Ensure content is an array
          if (!post.content || (Array.isArray(post.content) && post.content.length === 0)) {
            post.content = [post.excerpt || ''];
          } else if (typeof post.content === 'string') {
            post.content = post.content.split('\n').filter((p: string) => p.trim() !== '');
          }
          
          // Default author if missing
          if (!post.author) {
            post.author = 'Ives De Saeger';
          }
        }
        this.post = post;
        if (this.post) {
          const contentStr = Array.isArray(this.post.content) 
            ? (this.post.content[0] || '') 
            : (this.post.content || '');

          this.seoService.updateSeoTags({
            title: `${this.post.title} | P41 Blog`,
            description: contentStr.substring(0, 160) + '...',
            image: (this.post.image || '').startsWith('http') ? this.post.image : `https://www.p41.be/${this.post.image}`,
            type: 'article',
            publishedDate: new Date().toISOString(), 
            section: 'Industrial Intelligence'
          });
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching blog post:', err);
        this.isLoading.set(false);
      }
    });
  }

  get otherPosts(): BlogPost[] {
    if (!this.post) return this.allPosts.slice(0, 2);
    return this.allPosts
      .filter(p => p.id !== this.post?.id)
      .slice(0, 2);
  }
}
