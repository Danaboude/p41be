import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail';
import { BlogComponent } from './pages/blog/blog';
import { AboutComponent } from './pages/about/about';
import { AcademyComponent } from './pages/academy/academy';
import { CourseDetailComponent } from './pages/academy/course-detail/course-detail';
import { ConsultancyComponent } from './pages/consultancy/consultancy';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'consultancy', component: ConsultancyComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'academy', component: AcademyComponent },
  { path: 'academy/:courseId', component: CourseDetailComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:slug', component: BlogDetailComponent },
  { path: '**', redirectTo: '' }
];
