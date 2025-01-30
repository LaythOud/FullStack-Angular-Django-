import { Component } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [AsyncPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  toastMessage$: Observable<{ message: string; type: string } | null>;

  constructor(private toastService: ToastService) {
    this.toastMessage$ = this.toastService.toastMessage$;
  }
}
