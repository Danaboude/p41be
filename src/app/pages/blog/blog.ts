import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css']
})
export class BlogComponent implements OnInit {
  private translationService = inject(TranslationService);
  private dataService = inject(DataService);
  private router = inject(Router);
  t = this.translationService.t;

  blogs = signal<any[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.dataService.getBlogPosts().subscribe({
      next: (data) => {
        this.blogs.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  navigateToDetail(slug: string) {
    this.router.navigate(['/blog', slug]);
  }
}
