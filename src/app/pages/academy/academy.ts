import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { DataService } from '../../core/services/data.service';

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  modules: number;
  price: string;
  isPaid: boolean;
  tags: string[];
  instructor: string;
  rating: number;
  students: number;
}

@Component({
  selector: 'app-academy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './academy.html',
  styleUrls: ['./academy.css']
})
export class AcademyComponent implements OnInit {
  private translationService = inject(TranslationService);
  private dataService = inject(DataService);
  t = this.translationService.t;

  courses = signal<Course[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.dataService.getCourses().subscribe({
      next: (data) => {
        this.courses.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  get featuredCourse(): Course | null {
    return this.courses().length > 0 ? this.courses()[0] : null;
  }

  get otherCourses(): Course[] {
    return this.courses().slice(1);
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating || 0)).fill(0);
  }

  getLevelIcon(level: string): string {
    switch (level) {
      case 'Beginner': return 'signal_cellular_1_bar';
      case 'Intermediate': return 'signal_cellular_3_bar';
      case 'Advanced': return 'signal_cellular_4_bar';
      case 'Expert': return 'signal_cellular_connected_no_internet_4_bar';
      default: return 'signal_cellular_alt';
    }
  }
}
