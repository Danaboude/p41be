import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';

export interface User {
  id: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser = signal<User | null>(this.getStoredUser());
  token = signal<string | null>(localStorage.getItem('p41_token'));

  isAuthenticated = signal<boolean>(!!this.token());

  private getStoredUser(): User | null {
    const userJson = localStorage.getItem('p41_user');
    return userJson ? JSON.parse(userJson) : null;
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>('/api/auth/login', { email, password }).pipe(
      tap(response => {
        localStorage.setItem('p41_token', response.token);
        localStorage.setItem('p41_user', JSON.stringify(response.user));
        this.token.set(response.token);
        this.currentUser.set(response.user);
        this.isAuthenticated.set(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('p41_token');
    localStorage.removeItem('p41_user');
    this.token.set(null);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/admin/login']);
  }
}
