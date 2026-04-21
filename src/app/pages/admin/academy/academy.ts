import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-academy',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './academy.html'
})
export class AdminAcademyComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);
  private http = inject(HttpClient);

  courses = signal<any[]>([]);
  isLoading = signal(false);

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.isLoading.set(true);
    this.dataService.getCourses().subscribe({
      next: (data) => {
        this.courses.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  deleteCourse(id: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.dataService.deleteCourse(id).subscribe(() => {
        this.loadCourses();
      });
    }
  }

  // --- Manual Material Link Functionality ---
  uploadingCourseId = signal<string | null>(null);
  existingMaterials = signal<any[]>([]);
  isSaving = signal(false);
  isLoadingMaterials = signal(false);
  saveError = signal<string | null>(null);

  materialName = '';
  materialUrl = '';
  materialType = 'DOCUMENT';

  openUploadModal(courseId: string) {
    this.uploadingCourseId.set(courseId);
    this.saveError.set(null);
    this.materialName = '';
    this.materialUrl = '';
    this.materialType = 'DOCUMENT';
    this.fetchMaterials(courseId);
  }

  fetchMaterials(courseId: string) {
    this.isLoadingMaterials.set(true);
    const token = localStorage.getItem('p41_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(`/api/academy/materials?courseId=${courseId}`, { headers }).subscribe({
      next: (data) => {
        this.existingMaterials.set(data);
        this.isLoadingMaterials.set(false);
      },
      error: () => {
        this.isLoadingMaterials.set(false);
      }
    });
  }

  deleteMaterial(materialId: string) {
    const token = localStorage.getItem('p41_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.delete(`/api/academy/materials?id=${materialId}`, { headers }).subscribe({
      next: () => {
        const currentParams = this.uploadingCourseId();
        if (currentParams) this.fetchMaterials(currentParams);
      },
      error: (e) => console.error('Failed to delete', e)
    });
  }

  closeUploadModal() {
    if (this.isSaving()) return;
    this.uploadingCourseId.set(null);
  }

  saveMaterial() {
    const courseId = this.uploadingCourseId();
    if (!courseId || !this.materialName || !this.materialUrl) return;

    this.isSaving.set(true);
    this.saveError.set(null);

    const token = localStorage.getItem('p41_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('/api/academy/materials', {
      courseId,
      name: this.materialName,
      url: this.materialUrl,
      type: this.materialType
    }, { headers }).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.materialName = '';
        this.materialUrl = '';
        const currentParams = this.uploadingCourseId();
        if (currentParams) this.fetchMaterials(currentParams);
      },
      error: (err) => {
        console.error('Failed to save material:', err);
        this.saveError.set(err.error?.error || 'Error occurred saving material.');
        this.isSaving.set(false);
      }
    });
  }
}
