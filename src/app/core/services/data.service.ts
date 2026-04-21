import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private getHeaders() {
    const token = this.authService.token();
    return {
      'Authorization': `Bearer ${token}`
    };
  }

  // Academy Courses
  getCourses(): Observable<any[]> {
    return this.http.get<any[]>('/api/academy');
  }

  createCourse(course: any): Observable<any> {
    return this.http.post<any>('/api/academy', course, { headers: this.getHeaders() });
  }

  updateCourse(course: any): Observable<any> {
    return this.http.put<any>('/api/academy', course, { headers: this.getHeaders() });
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(`/api/academy?id=${id}`, { headers: this.getHeaders() });
  }

  // Blog Posts
  getBlogPosts(): Observable<any[]> {
    return this.http.get<any[]>('/api/blog');
  }

  createBlogPost(post: any): Observable<any> {
    return this.http.post<any>('/api/blog', post, { headers: this.getHeaders() });
  }

  updateBlogPost(post: any): Observable<any> {
    return this.http.put<any>('/api/blog', post, { headers: this.getHeaders() });
  }

  deleteBlogPost(id: string): Observable<any> {
    return this.http.delete<any>(`/api/blog?id=${id}`, { headers: this.getHeaders() });
  }

  // Upload Image
  uploadImage(file: File): Observable<any> {
    return this.http.post<any>('/api/upload', file, {
      headers: {
        ...this.getHeaders(),
        'x-filename': file.name,
        'Content-Type': file.type
      }
    });
  }
}
