import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-8 animate-fade-in">
      
      <!-- Enrollments Section -->
      <div>
        <div class="bg-white rounded-[40px] p-8 border border-outline-variant/5 shadow-sm">
           <div class="flex items-center justify-between mb-8">
             <h3 class="font-black text-2xl">Course Enrollments</h3>
             <button (click)="fetchPurchases()" class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors">
               <span class="material-symbols-outlined text-sm" [class.animate-spin]="isLoadingPurchases">sync</span>
             </button>
           </div>
           
           <div *ngIf="isLoadingPurchases" class="text-center py-10 text-on-surface-variant/50">
             Loading purchases...
           </div>
           
           <div *ngIf="!isLoadingPurchases && purchases.length === 0" class="text-center py-16 text-on-surface-variant/50">
              <span class="material-symbols-outlined text-4xl block mb-2 opacity-50">inbox</span>
              No purchases found.
           </div>

           <div class="overflow-x-auto" *ngIf="!isLoadingPurchases && purchases.length > 0">
             <table class="w-full text-left">
                <thead>
                   <tr class="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/40 border-b border-outline-variant/10">
                      <th class="pb-3 px-4">Date</th>
                      <th class="pb-3 px-4">Buyer</th>
                      <th class="pb-3 px-4">Company</th>
                      <th class="pb-3 px-4">Status</th>
                      <th class="pb-3 px-4 text-right">Action</th>
                   </tr>
                </thead>
                <tbody>
                   <tr *ngFor="let p of purchases" class="border-b border-outline-variant/5 hover:bg-surface-container-lowest transition-colors">
                      <td class="py-4 px-4 text-sm whitespace-nowrap">{{ p.createdAt | date:'shortDate' }}</td>
                      <td class="py-4 px-4 text-sm">
                        <div class="font-bold text-on-surface">{{ p.name }}</div>
                        <div class="text-xs text-on-surface-variant mt-0.5">{{ p.email }} <span class="opacity-50">·</span> {{ p.phone }}</div>
                      </td>
                      <td class="py-4 px-4 text-sm text-on-surface-variant">
                        <ng-container *ngIf="p.vatCompany">{{ p.vatCompany }}</ng-container>
                        <ng-container *ngIf="!p.vatCompany"><span class="italic opacity-50">None</span></ng-container>
                      </td>
                      <td class="py-4 px-4">
                         <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" 
                           [ngClass]="{'bg-success/10 text-success border border-success/20': p.status === 'PAID', 'bg-[#D4A843]/10 text-[#D4A843] border border-[#D4A843]/20': p.status === 'PENDING'}">
                           {{ p.status }}
                         </span>
                      </td>
                      <td class="py-4 px-4 text-right">
                         <button (click)="openEmailModal(p)" class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-bold text-xs rounded-xl hover:bg-primary/20 transition-colors">
                            <span class="material-symbols-outlined text-sm">mail</span> Email
                         </button>
                      </td>
                   </tr>
                </tbody>
             </table>
           </div>
        </div>
      </div>

      <!-- Email Modal -->
      <div *ngIf="selectedPurchase" class="fixed inset-0 z-[100] flex items-center justify-center bg-inverse-surface/80 backdrop-blur-sm p-4 animate-fade-in">
         <div class="bg-white rounded-3xl p-8 max-w-lg w-full relative shadow-2xl scale-in">
            <button (click)="closeEmailModal()" class="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-surface text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors">
               <span class="material-symbols-outlined text-sm">close</span>
            </button>
            <h3 class="text-xl font-black mb-1 pr-10">Compose Email to {{ selectedPurchase.name }}</h3>
            <p class="text-xs font-bold text-on-surface-variant/60 mb-6 bg-surface-container-low inline-block px-3 py-1 rounded-lg">{{ selectedPurchase.email }}</p>

            <form (ngSubmit)="sendEmail()">
               <div class="mb-4">
                  <label class="block text-xs font-bold text-on-surface-variant mb-1">Subject</label>
                  <input type="text" [(ngModel)]="emailSubject" name="subject" class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" required>
               </div>
               <div class="mb-6">
                  <label class="block text-xs font-bold text-on-surface-variant mb-1 flex items-center justify-between">
                    Message Body (HTML)
                    <span class="font-normal text-[10px] text-on-surface-variant/50">Header/footer added automatically</span>
                  </label>
                  <textarea [(ngModel)]="emailBody" name="body" rows="6" class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" required></textarea>
               </div>
               <div class="flex justify-end gap-3 pt-2 border-t border-outline-variant/10">
                  <button type="button" (click)="closeEmailModal()" class="px-6 py-3 rounded-xl text-on-surface-variant font-bold text-sm hover:bg-surface-container-low transition-colors">Cancel</button>
                  <button type="submit" [disabled]="isSending" class="px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-primary/20">
                     <span *ngIf="isSending" class="material-symbols-outlined animate-spin text-sm">sync</span>
                     <span *ngIf="!isSending" class="material-symbols-outlined text-sm">send</span>
                     {{ isSending ? 'Sending...' : 'Send securely' }}
                  </button>
               </div>
            </form>
         </div>
      </div>

    </div>
  `
})
export class AdminDashboardHomeComponent implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  purchases: any[] = [];
  isLoadingPurchases = false;

  selectedPurchase: any | null = null;
  emailSubject = '';
  emailBody = '';
  isSending = false;

  ngOnInit() {
    this.fetchPurchases();
  }

  fetchPurchases() {
    console.log('--- fetchPurchases() started ---');
    this.isLoadingPurchases = true;
    const token = localStorage.getItem('p41_token');
    console.log('Token exists?', !!token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log('Executing this.http.get...');
    this.http.get<any[]>('/api/purchases', { headers })
      .pipe(
        finalize(() => {
          this.isLoadingPurchases = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
      next: (res) => {
        this.purchases = Array.isArray(res) ? res : [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load purchases:', err);
        if (err.status === 401) {
          console.log("Mocking purchases due to unauth local env");
          this.purchases = [
            { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+32490000000', status: 'PAID', createdAt: new Date() }
          ];
        }
      }
    });
  }

  openEmailModal(purchase: any) {
    this.selectedPurchase = purchase;
    this.emailSubject = 'Update on your Course Enrollment';
    this.emailBody = `<p>Dear ${purchase.name},</p>\n\n<p>Thank you for enrolling! Here is your latest update...</p>`;
  }

  closeEmailModal() {
    this.selectedPurchase = null;
    this.emailSubject = '';
    this.emailBody = '';
  }

  sendEmail() {
    if (!this.selectedPurchase || !this.emailSubject || !this.emailBody) return;

    this.isSending = true;
    const token = localStorage.getItem('p41_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('/api/emails/send', {
      to: this.selectedPurchase.email,
      subject: this.emailSubject,
      htmlBody: this.emailBody
    }, { headers }).subscribe({
      next: () => {
        this.isSending = false;
        alert('Email sent successfully!');
        this.closeEmailModal();
      },
      error: (err) => {
        this.isSending = false;
        alert('Failed to send email: ' + (err.error?.error || err.message));
      }
    });
  }
}
