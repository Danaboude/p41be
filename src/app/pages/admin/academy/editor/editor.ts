import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-admin-course-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editor.html'
})
export class AdminCourseEditorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dataService = inject(DataService);

  isEditMode = false;
  courseId: string | null = null;
  isLoading = signal(false);
  isSaving = signal(false);
  isUploadingImg = false;

  courseForm: any = {
    title: '',
    subtitle: '',
    description: '',
    longDescription: [],
    image: '',
    duration: '',
    level: 'Beginner',
    modules: [],
    price: '€0',
    isPaid: false,
    tags: [],
    instructor: 'Ives De Saeger',
    rating: 5.0,
    students: 0,
    whatYouLearn: [],
    prerequisites: []
  };

  newTag = '';
  newOutcome = '';
  newPrereq = '';
  newModule = { title: '', duration: '', description: '' };
  newLongDescPara = '';

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.isEditMode = true;
      this.loadCourse();
    }
  }

  loadCourse() {
    this.isLoading.set(true);
    this.dataService.getCourses().subscribe({
      next: (courses) => {
        const found = courses.find(c => c.id === this.courseId);
        if (found) {
          this.courseForm = { 
            ...found,
            longDescription: Array.isArray(found.longDescription) ? found.longDescription : [],
            modules: Array.isArray(found.modules) ? found.modules : [],
            whatYouLearn: Array.isArray(found.whatYouLearn) ? found.whatYouLearn : [],
            prerequisites: Array.isArray(found.prerequisites) ? found.prerequisites : []
          };
        }
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isUploadingImg = true;
      this.dataService.uploadImage(file).subscribe({
        next: (blob) => {
          this.courseForm.image = blob.url;
          this.isUploadingImg = false;
        },
        error: () => {
          this.isUploadingImg = false;
          alert('Upload failed');
        }
      });
    }
  }

  save() {
    this.isSaving.set(true);
    const obs$ = this.isEditMode 
      ? this.dataService.updateCourse(this.courseForm)
      : this.dataService.createCourse(this.courseForm);

    obs$.subscribe({
      next: () => {
        this.isSaving.set(false);
        this.router.navigate(['/admin/academy']);
      },
      error: () => this.isSaving.set(false)
    });
  }

  // List Management
  addTag() {
    if (this.newTag.trim()) {
      this.courseForm.tags.push(this.newTag.trim());
      this.newTag = '';
    }
  }
  removeTag(idx: number) { this.courseForm.tags.splice(idx, 1); }

  addOutcome() {
    if (this.newOutcome.trim()) {
      this.courseForm.whatYouLearn.push(this.newOutcome.trim());
      this.newOutcome = '';
    }
  }
  removeOutcome(idx: number) { this.courseForm.whatYouLearn.splice(idx, 1); }

  addPrereq() {
    if (this.newPrereq.trim()) {
      this.courseForm.prerequisites.push(this.newPrereq.trim());
      this.newPrereq = '';
    }
  }
  removePrereq(idx: number) { this.courseForm.prerequisites.splice(idx, 1); }

  addModule() {
    if (this.newModule.title.trim()) {
      this.courseForm.modules.push({ ...this.newModule });
      this.newModule = { title: '', duration: '', description: '' };
    }
  }
  removeModule(idx: number) { this.courseForm.modules.splice(idx, 1); }

  addLongDescPara() {
    if (this.newLongDescPara.trim()) {
      this.courseForm.longDescription.push(this.newLongDescPara.trim());
      this.newLongDescPara = '';
    }
  }
  removeLongDescPara(idx: number) { this.courseForm.longDescription.splice(idx, 1); }
}
