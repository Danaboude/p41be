import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './layout.html'
})
export class AdminLayoutComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  isSidebarOpen = signal(false);

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  menuItems = [
    { name: 'Course Enrollments', icon: 'group', route: '/admin/dashboard' },
    { name: 'Academy', icon: 'school', route: '/admin/academy' },
    { name: 'Blog', icon: 'edit_note', route: '/admin/blog' },
  ];

  isRouteActive(route: string): boolean {
    return this.currentUrl().startsWith(route);
  }

  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }

  logout() {
    this.authService.logout();
  }
}
