import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-course-access',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './access.html'
})
export class CourseAccessComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  isLoading = signal(true);
  error = signal<string | null>(null);
  
  courseData = signal<any | null>(null);
  materials = signal<any[]>([]);
  purchaseData = signal<any | null>(null);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const purchaseId = params.get('purchaseId');
      if (purchaseId) {
        this.verifyAccess(purchaseId);
      } else {
        this.error.set('Invalid access link.');
        this.isLoading.set(false);
      }
    });
  }

  verifyAccess(purchaseId: string) {
    this.isLoading.set(true);
    this.http.get<any>(`/api/academy/access?purchaseId=${purchaseId}`).subscribe({
      next: (res) => {
        this.courseData.set(res.course);
        this.materials.set(res.materials);
        this.purchaseData.set(res.purchase);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.error || 'Could not verify access to this course.');
        this.isLoading.set(false);
      }
    });
  }

  // Help format sizes nicely
  formatBytes(bytes: number, decimals = 2) {
      if (!+bytes) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
