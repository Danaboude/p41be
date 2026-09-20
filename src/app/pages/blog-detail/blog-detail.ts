import { Component, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Meta } from '@angular/platform-browser';
import { publicationDate, videoEmbedUrl } from '../../core/blog-utils';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { DataService } from '../../core/services/data.service';
import { TranslationService } from '../../core/services/translation.service';

interface BlogPost {
  kind?: string;
  sourceUrl?: string;
  videoUrl?: string;
  dateApproximate?: boolean;
  id: string;
  slug?: string;
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
  private meta = inject(Meta);
  private sanitizer = inject(DomSanitizer);
  video: SafeResourceUrl | null = null;
  videoPlaying = false;
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);
  private dataService = inject(DataService);
  private translationService = inject(TranslationService);
  lang = this.translationService.lang;
  t = this.translationService.t;

  post: BlogPost | null = null;
  allPosts = signal<BlogPost[]>([]);
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
    this.dataService.getBlogPosts().subscribe({ next: (posts: any[]) => this.allPosts.set(posts), error: () => this.allPosts.set([]) });
  }

  private loadPost(slug: string) {
    this.isLoading.set(true);
    this.post = null;
    this.video = null;
    this.videoPlaying = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });


    this.dataService.getBlogPost(slug).subscribe({
      next: (post: any) => {

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
          const url = `https://www.p41.be/blog/${this.post.slug || this.post.id}`;
          const image = new URL(this.post.image || 'ives front look.jpg', 'https://www.p41.be/').href;
          const publishedDate = this.post.dateApproximate ? undefined : publicationDate(this.post.date);
          const embed = this.post.videoUrl ? videoEmbedUrl(this.post.videoUrl) : null;
          this.video = embed ? this.sanitizer.bypassSecurityTrustResourceUrl(embed) : null;
          this.seoService.updateSeoTags({
            title: `${this.post.title} | P41 Blog`,
            description: this.post.excerpt,
            image, url, type: 'article', publishedDate,
            section: this.post.kind === 'LINKEDIN' ? 'LinkedIn updates' : 'Industrial efficiency',
            jsonLd: {
              '@context': 'https://schema.org', '@type': 'BlogPosting',
              headline: this.post.title, description: this.post.excerpt,
              image, url, mainEntityOfPage: url,
              ...(publishedDate ? { datePublished: publishedDate } : {}),
              author: { '@type': 'Person', name: 'Ives De Saeger', url: 'https://www.p41.be/about' },
              publisher: { '@type': 'Organization', name: 'P41', url: 'https://www.p41.be' }
            }
          });
        }
        if (!this.post) this.setMissingSeo();
        this.isLoading.set(false);
      },
      error: (err) => {
        this.setMissingSeo();
        this.isLoading.set(false);
      }
    });
  }

  private setMissingSeo() {
    this.seoService.updateSeoTags({ title: 'Post not found | P41', description: 'This post could not be found.' });
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }

  get otherPosts(): BlogPost[] {
    if (!this.post) return this.allPosts().slice(0, 2);
    return this.allPosts()
      .filter(p => p.id !== this.post?.id)
      .slice(0, 2);
  }
}
