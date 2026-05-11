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
  isSaving = signal(false);
  isDeleting = signal<string | null>(null);
  isUploadingImg = signal(false);
  tagInput = signal('');
  
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
      this.isUploadingImg.set(true);
      this.dataService.uploadImage(file).subscribe({
        next: (blob) => {
          this.postForm.image = blob.url;
          this.isUploadingImg.set(false);
        },
        error: (err) => {
          console.error('Upload failed', err);
          this.isUploadingImg.set(false);
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
    this.postForm = { title: '', excerpt: '', content: '', image: '', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), readTime: '5 min read', tags: [] };
    this.isModalOpen = true;
  }

  openEditModal(post: any) {
    this.editingPost = post;
    const contentStr = Array.isArray(post.content) ? post.content.join('\n') : (post.content || '');
    this.postForm = { ...post, content: contentStr };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingPost = null;
  }

  addTag() {
    const tag = this.tagInput().trim().toLowerCase();
    if (tag && !this.postForm.tags.includes(tag)) {
      this.postForm.tags.push(tag);
      this.tagInput.set('');
    }
  }

  removeTag(tag: string) {
    this.postForm.tags = this.postForm.tags.filter((t: string) => t !== tag);
  }

  savePost() {
    this.isSaving.set(true);
    
    // Prepare data (convert content string to array if needed)
    const postData = { ...this.postForm };
    if (typeof postData.content === 'string') {
      postData.content = postData.content.split('\n').filter((p: string) => p.trim() !== '');
    }

    if (this.editingPost) {
      this.dataService.updateBlogPost(postData).subscribe({
        next: () => {
          this.loadPosts();
          this.closeModal();
          this.isSaving.set(false);
        },
        error: () => this.isSaving.set(false)
      });
    } else {
      this.dataService.createBlogPost(postData).subscribe({
        next: () => {
          this.loadPosts();
          this.closeModal();
          this.isSaving.set(false);
        },
        error: () => this.isSaving.set(false)
      });
    }
  }

  deletePost(id: string) {
    if (confirm('Are you sure you want to delete this article?')) {
      this.isDeleting.set(id);
      this.dataService.deleteBlogPost(id).subscribe({
        next: () => {
          this.loadPosts();
          this.isDeleting.set(null);
        },
        error: () => this.isDeleting.set(null)
      });
    }
  }
}
