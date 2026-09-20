import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  lang = this.translationService.lang;
  t = this.translationService.t;

  blogs = signal<any[]>([]);
  linkedinPosts = computed(() => this.blogs().filter(p => p.kind === 'LINKEDIN'));
  articles = computed(() => this.blogs().filter(p => p.kind !== 'LINKEDIN'));
  failed = signal(false);
  isLoading = signal(true);

  ngOnInit() { this.loadPosts(); }

  loadPosts() {
    this.isLoading.set(true);
    this.failed.set(false);
    this.dataService.getBlogPosts().subscribe({
      next: (data) => {
        this.blogs.set([...data].sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0)));
        this.isLoading.set(false);
      },
      error: () => { this.failed.set(true); this.isLoading.set(false); }
    });
  }

}
