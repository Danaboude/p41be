import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../core/services/data.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './course-detail.html',
  styleUrls: ['./course-detail.css']
})
export class CourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);

  checkoutForm: FormGroup;
  showCheckout = signal(false);
  isCheckingOut = signal(false);

  constructor() {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]{7,15}$/)]],
      address: [''],
      vatCompany: [''],
      vatAddress: ['']
    });
  }

  course = signal<any | null>(null);
  allCourses = signal<any[]>([]);
  isLoading = signal(true);
  expandedModule = signal<number | null>(null);

  otherCourses = computed(() => {
    return this.allCourses().filter(c => c.id !== this.course()?.id).slice(0, 3);
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('courseId');
      this.loadData(courseId);
    });

    this.route.queryParamMap.subscribe(queryParams => {
      const paymentStatus = queryParams.get('payment');
      const paymentId = queryParams.get('id');

      if (paymentStatus === 'success' && paymentId) {
        // Verify payment and trigger email fallback on server
        this.http.get<any>(`/api/payments/mollie?id=${paymentId}`).subscribe({
          next: (res) => {
            if (res.status === 'paid') {
              this.notificationService.success('Payment succeeded! Welcome to the course.', 10000);
            } else {
              this.notificationService.show('Payment status: ' + res.status, 'info');
            }
            // Clear query parameters from URL
            window.history.replaceState({}, '', window.location.pathname);
          },
          error: (err) => {
            console.error('Confirmation error:', err);
            this.notificationService.error('Could not verify payment status.');
          }
        });
      } else if (paymentStatus === 'success') {
        // Legacy fallback if no ID is present
        this.notificationService.success('Payment succeeded! Welcome to the course.', 10000);
        window.history.replaceState({}, '', window.location.pathname);
      }
    });
  }

  loadData(courseId: string | null) {
    this.isLoading.set(true);
    // Fetch all courses to find the current one and populate suggestions
    this.dataService.getCourses().subscribe({
      next: (courses) => {
        this.allCourses.set(courses);
        const found = courses.find(c => c.id === courseId);
        this.course.set(found || null);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  toggleModule(index: number) {
    this.expandedModule.set(this.expandedModule() === index ? null : index);
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating || 0)).fill(0);
  }

  getTotalDuration(): string {
    const course = this.course();
    if (!course || !course.modules || !Array.isArray(course.modules)) return '';
    let totalMinutes = 0;
    for (const m of course.modules) {
      const match = m.duration.match(/(\d+)/);
      if (match) totalMinutes += parseInt(match[1], 10);
    }
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }

  startCheckout() {
    this.showCheckout.set(true);
  }

  submitCheckout() {
    if (this.checkoutForm.invalid || !this.course()) {
       this.checkoutForm.markAllAsTouched();
       return;
    }
    
    this.isCheckingOut.set(true);
    const payload = {
       courseId: this.course().id,
       ...this.checkoutForm.value
    };
    
    this.http.post<any>('/api/payments/mollie', payload).subscribe({
       next: (res) => {
          if (res.checkoutUrl) {
             window.location.href = res.checkoutUrl;
          } else {
             this.isCheckingOut.set(false);
             alert('Payment initiation failed');
          }
       },
       error: (err) => {
          this.isCheckingOut.set(false);
          alert('Error: ' + (err.error?.error || err.message));
       }
    });
  }
}
