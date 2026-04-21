import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.html'
})
export class AdminBlogComponent implements OnInit {
  private dataService = inject(DataService);

  posts = signal<any[]>([]);
  isLoading = signal(false);
  isUploadingImg = false;
  
  // Modal State
  isModalOpen = false;
  editingPost: any = null;

  // Form State
  postForm: any = {
    title: '',
    excerpt: '',
    content: [],
    image: '',
    date: '',
    readTime: '5 min read',
    tags: []
  };

  ngOnInit() {
    this.loadPosts();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isUploadingImg = true;
      this.dataService.uploadImage(file).subscribe({
        next: (blob) => {
          this.postForm.image = blob.url;
          this.isUploadingImg = false;
        },
        error: (err) => {
          console.error('Upload failed', err);
          this.isUploadingImg = false;
          alert('Failed to upload image. Please try again.');
        }
      });
    }
  }

  loadPosts() {
    this.isLoading.set(true);
    this.dataService.getBlogPosts().subscribe({
      next: (data) => {
        this.posts.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  openAddModal() {
    this.editingPost = null;
    this.postForm = { title: '', excerpt: '', content: [], image: '', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), readTime: '5 min read', tags: [] };
    this.isModalOpen = true;
  }

  openEditModal(post: any) {
    this.editingPost = post;
    this.postForm = { ...post };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingPost = null;
  }

  savePost() {
    if (this.editingPost) {
      this.dataService.updateBlogPost(this.postForm).subscribe(() => {
        this.loadPosts();
        this.closeModal();
      });
    } else {
      this.dataService.createBlogPost(this.postForm).subscribe(() => {
        this.loadPosts();
        this.closeModal();
      });
    }
  }

  deletePost(id: string) {
    if (confirm('Are you sure you want to delete this article?')) {
      this.dataService.deleteBlogPost(id).subscribe(() => {
        this.loadPosts();
      });
    }
  }
}
