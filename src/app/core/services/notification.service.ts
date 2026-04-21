import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  message: string;
  type: NotificationType;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSignal = signal<Notification | null>(null);
  notification = this.notificationSignal.asReadonly();

  show(message: string, type: NotificationType = 'success', duration: number = 5000) {
    this.notificationSignal.set({ message, type, duration });
    
    if (duration > 0) {
      setTimeout(() => {
        this.clear();
      }, duration);
    }
  }

  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.show(message, 'error', duration);
  }

  clear() {
    this.notificationSignal.set(null);
  }
}
