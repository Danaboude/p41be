import { Component, inject, signal, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { publicationDate, linkedinUrl, videoEmbedUrl } from '../../../core/blog-utils';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.html'
})
export class AdminBlogComponent implements OnInit {
  @ViewChild('editorDialog') editorDialog?: ElementRef<HTMLElement>;
  private previousFocus: HTMLElement | null = null;
  private dataService = inject(DataService);

  error = signal('');
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
    kind: 'ARTICLE', sourceUrl: '', videoUrl: '', dateApproximate: false,
    title: '',
    slug: '',
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
    this.error.set('');
    this.isLoading.set(true);
    this.dataService.getBlogPosts().subscribe({
      next: (data) => {
        this.posts.set(data);
        this.isLoading.set(false);
      },
      error: () => { this.error.set('Could not load posts. Please try again.'); this.isLoading.set(false); }
    });
  }

  openAddModal() {
    this.error.set('');
    this.tagInput.set('');
    this.editingPost = null;
    this.postForm = { kind: 'ARTICLE', sourceUrl: '', videoUrl: '', dateApproximate: false, title: '', slug: '', excerpt: '', content: '', image: '', date: new Date().toISOString().slice(0, 10), readTime: '5 min read', tags: [] };
    this.previousFocus = document.activeElement as HTMLElement;
    this.isModalOpen = true;
    setTimeout(() => this.editorDialog?.nativeElement.querySelector<HTMLElement>('button')?.focus());
  }

  openEditModal(post: any) {
    this.error.set('');
    this.tagInput.set('');
    this.editingPost = post;
    const contentStr = Array.isArray(post.content) ? post.content.join('\n') : (post.content || '');
    this.postForm = { kind: 'ARTICLE', sourceUrl: '', videoUrl: '', dateApproximate: false, ...post, tags: [...post.tags], date: publicationDate(post.date) || '', content: contentStr };
    this.previousFocus = document.activeElement as HTMLElement;
    this.isModalOpen = true;
    setTimeout(() => this.editorDialog?.nativeElement.querySelector<HTMLElement>('button')?.focus());
  }

  closeModal() {
    if (this.isSaving()) return;
    this.previousFocus?.focus();
    this.isModalOpen = false;
    this.editingPost = null;
  }

  trapFocus(event: KeyboardEvent) {
    if (event.key !== 'Tab') return;
    const controls = this.editorDialog?.nativeElement.querySelectorAll<HTMLElement>('button:not([disabled]), input, textarea, select, a[href]');
    if (!controls?.length) return;
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
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
    if (this.isSaving()) return;
    this.error.set('');
    if (!this.postForm.title.trim() || !this.postForm.excerpt.trim() || !this.postForm.content.trim() || !publicationDate(this.postForm.date)) {
      this.error.set('Add a title, summary, content and valid publication date.'); return;
    }
    if (this.postForm.sourceUrl && !linkedinUrl(this.postForm.sourceUrl)) { this.error.set('Enter an HTTPS LinkedIn link.'); return; }
    if (this.postForm.videoUrl && !videoEmbedUrl(this.postForm.videoUrl)) { this.error.set('Enter a Vimeo player or Streamable embed URL, not iframe HTML.'); return; }
    const token = this.dataService.token;
    if (!token) {
      alert('Your session has expired. Please log in again.');
      return;
    }
    this.isSaving.set(true);
    
    // Prepare data (convert content string to array if needed)
    const postData = { ...this.postForm };
    if (typeof postData.content === 'string') {
      postData.content = postData.content.split('\n').filter((p: string) => p.trim() !== '');
    }

    // Auto-generate slug if missing
    if (!postData.slug && postData.title) {
      postData.slug = postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    if (this.editingPost) {
      this.dataService.updateBlogPost(postData).subscribe({
        next: () => {
          this.loadPosts();
          this.isSaving.set(false);
          this.closeModal();
        },
        error: (err) => { this.error.set(err.error?.message || 'Could not save this post. Please try again.'); this.isSaving.set(false); }
      });
    } else {
      this.dataService.createBlogPost(postData).subscribe({
        next: () => {
          this.loadPosts();
          this.isSaving.set(false);
          this.closeModal();
        },
        error: (err) => { this.error.set(err.error?.message || 'Could not save this post. Please try again.'); this.isSaving.set(false); }
      });
    }
  }

  deletePost(id: string) {
    const token = this.dataService.token;
    if (!token) {
      alert('Your session has expired. Please log in again.');
      return;
    }
    if (confirm('Are you sure you want to delete this article?')) {
      this.isDeleting.set(id);
      this.dataService.deleteBlogPost(id).subscribe({
        next: () => {
          this.loadPosts();
          this.isDeleting.set(null);
        },
        error: () => { this.error.set('Could not delete this post. Please try again.'); this.isDeleting.set(null); }
      });
    }
  }
}
