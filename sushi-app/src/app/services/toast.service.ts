import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error';
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  toasts$ = this.toastsSubject.asObservable();
  private counter = 0;

  show(text: string, type: 'success' | 'error' = 'success'): void {
    const id = this.counter++;
    const currentToasts = this.toastsSubject.value;
    const newToast: ToastMessage = { text, type, id };
    
    this.toastsSubject.next([...currentToasts, newToast]);

    // Supprimer automatiquement après 3 secondes
    setTimeout(() => {
      this.remove(id);
    }, 3000);
  }

  remove(id: number): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(t => t.id !== id));
  }
}