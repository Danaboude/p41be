import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';

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
export class AcademyComponent {
  private translationService = inject(TranslationService);
  t = this.translationService.t;

  courses: Course[] = [
    {
      id: 'lean-manufacturing-4-0',
      title: 'Lean Manufacturing 4.0',
      subtitle: 'From Classic Lean to Digital Lean',
      description: 'Master the evolution of Lean principles in the era of Industry 4.0. Learn how IoT sensors, digital twins, and AI-driven analytics transform traditional waste elimination into predictive optimization.',
      image: 'CrossRoads-22-1-scaled-1.jpg',
      duration: '8 weeks',
      level: 'Intermediate',
      modules: 12,
      price: '€1,490',
      tags: ['Lean', 'Industry 4.0', 'IoT'],
      instructor: 'Ives De Saeger',
      rating: 4.9,
      students: 342
    },
    {
      id: 'time-study-mastery',
      title: 'Time Study Mastery',
      subtitle: 'MTM-UAS & Predetermined Time Systems',
      description: 'Deep dive into predetermined time study methods including MTM-1, MTM-UAS, MOST, and modern video analysis techniques. Discover how to measure, analyze, and optimize human workflows with scientific precision.',
      image: 'CrossRoads-29-scaled.jpg',
      duration: '6 weeks',
      level: 'Advanced',
      modules: 10,
      price: '€1,290',
      tags: ['Time Study', 'MTM-UAS', 'Ergonomics'],
      instructor: 'Ives De Saeger',
      rating: 4.8,
      students: 218
    },
    {
      id: 'theory-of-constraints',
      title: 'Theory of Constraints',
      subtitle: 'The Goal — Applied to Modern Manufacturing',
      description: 'Unlock the power of TOC to identify and eliminate bottlenecks in your production flow. Based on Goldratt\'s principles, adapted for today\'s complex multi-site operations.',
      image: 'hero_backgournd.jpg',
      duration: '5 weeks',
      level: 'Intermediate',
      modules: 8,
      price: '€990',
      tags: ['TOC', 'Flow', 'Bottleneck Analysis'],
      instructor: 'Ives De Saeger',
      rating: 4.7,
      students: 189
    },
    {
      id: 'smed-quick-changeover',
      title: 'SMED Quick Changeover',
      subtitle: 'Single-Minute Exchange of Dies',
      description: 'Reduce changeover times by up to 90%. Learn the systematic SMED methodology to convert internal setup operations to external ones and streamline your production flexibility.',
      image: 'ives-microfoon-334x500-1.jpg',
      duration: '4 weeks',
      level: 'Beginner',
      modules: 6,
      price: '€790',
      tags: ['SMED', 'Setup Reduction', 'Flexibility'],
      instructor: 'Ives De Saeger',
      rating: 4.9,
      students: 275
    },
    {
      id: 'digital-twin-simulation',
      title: 'Digital Twin & Simulation',
      subtitle: 'Build Virtual Factories That Think',
      description: 'Create physics-based digital twins of your production lines. Use simulation to test scenarios, predict failures, and optimize layouts before making any physical changes.',
      image: 'old_slide_3.jpg',
      duration: '10 weeks',
      level: 'Advanced',
      modules: 14,
      price: '€1,890',
      tags: ['Digital Twin', 'Simulation', 'AI'],
      instructor: 'Ives De Saeger',
      rating: 4.6,
      students: 134
    },
    {
      id: 'operational-excellence',
      title: 'Operational Excellence',
      subtitle: 'The Complete Operations Framework',
      description: 'A comprehensive framework covering value stream mapping, standard work, visual management, and continuous improvement culture. Build an organization that evolves autonomously.',
      image: 'blog1.png',
      duration: '12 weeks',
      level: 'Expert',
      modules: 18,
      price: '€2,490',
      tags: ['OpEx', 'VSM', 'Leadership'],
      instructor: 'Ives De Saeger',
      rating: 4.8,
      students: 156
    }
  ];

  get featuredCourse(): Course {
    return this.courses[0];
  }

  get otherCourses(): Course[] {
    return this.courses.slice(1);
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
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
