import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastMessages = new BehaviorSubject<{ message: string; type: string } | null>(null);
  toastMessage$ = this.toastMessages.asObservable();
  private timeoutId: object | number | null = null;

  showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId as number);
    }

    this.toastMessages.next({ message, type });
    this.timeoutId = setTimeout(() => {
      this.clearToast();
      this.timeoutId = null;
    }, 4000);
  }

  clearToast() {
    this.toastMessages.next(null);
  }
}
