import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail';
import { BlogComponent } from './pages/blog/blog';
import { AboutComponent } from './pages/about/about';
import { AcademyComponent } from './pages/academy/academy';
import { CourseDetailComponent } from './pages/academy/course-detail/course-detail';
import { CourseAccessComponent } from './pages/academy/access/access';
import { ConsultancyComponent } from './pages/consultancy/consultancy';
import { ContactComponent } from './pages/contact/contact';

// Admin Imports
import { AdminLoginComponent } from './pages/admin/login/login';
import { AdminLayoutComponent } from './pages/admin/layout/layout';
import { AdminDashboardHomeComponent } from './pages/admin/dashboard-home/dashboard-home';
import { AdminAcademyComponent } from './pages/admin/academy/academy';
import { AdminBlogComponent } from './pages/admin/blog/blog';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'consultancy', component: ConsultancyComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'academy', component: AcademyComponent },
  { path: 'academy/:courseId', component: CourseDetailComponent },
  { path: 'academy/access/:purchaseId', component: CourseAccessComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:slug', component: BlogDetailComponent },
  { path: 'privacy', loadComponent: () => import('./pages/privacy/privacy').then(m => m.PrivacyComponent) },
  
  // Admin Routes
  { path: 'admin/login', component: AdminLoginComponent },
  { 
    path: 'admin', 
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardHomeComponent },
      { path: 'academy', component: AdminAcademyComponent },
      { path: 'academy/new', loadComponent: () => import('./pages/admin/academy/editor/editor').then(m => m.AdminCourseEditorComponent) },
      { path: 'academy/edit/:id', loadComponent: () => import('./pages/admin/academy/editor/editor').then(m => m.AdminCourseEditorComponent) },
      { path: 'blog', component: AdminBlogComponent },
      { path: 'settings', component: AdminDashboardHomeComponent }, // Placeholder
    ]
  },

  { path: '**', redirectTo: '' }
];
