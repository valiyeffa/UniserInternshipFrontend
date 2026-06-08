import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']  
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toasts$.subscribe((toast: Toast) => {
      this.toasts.push(toast);
      setTimeout(() => this.removeToast(toast.id), 3500);
    });
  }

  removeToast(id: number): void {
    this.toasts = this.toasts.filter((toast: Toast) => toast.id !== id);
  }
}