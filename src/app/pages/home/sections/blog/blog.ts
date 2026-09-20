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
  
  lang = this.translationService.lang;
  t = this.translationService.t;
  realPosts = signal<any[]>([]);

  ngOnInit() {
    this.dataService.getBlogPosts().subscribe({
      next: (posts) => {
        if (posts && posts.length > 0) {
          this.realPosts.set(posts.slice(0, 3));
        }
      },
      error: () => this.realPosts.set([])
    });
  }

  blogs = computed(() => this.realPosts());
}
