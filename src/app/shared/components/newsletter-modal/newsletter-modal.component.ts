import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-backdrop" (click)="closeModal($event)">
      <div class="modal-container">
        <button class="close-btn" (click)="close()">&times;</button>

        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">Before You Go!</h2>
            <p class="modal-subtitle">Don't miss out on our latest articles and waste management tips.</p>
          </div>

          <div class="modal-body">
            <div class="newsletter-icon">
              <i class="fas fa-envelope-open-text"></i>
            </div>

            <p class="modal-description">
              Join our community of eco-conscious individuals and stay updated with:
            </p>

            <ul class="benefit-list">
              <li><i class="fas fa-check"></i> Expert waste management tips</li>
              <li><i class="fas fa-check"></i> Sustainability guides & resources</li>
              <li><i class="fas fa-check"></i> Exclusive discounts on our services</li>
              <li><i class="fas fa-check"></i> Early access to new content</li>
            </ul>

            <form (ngSubmit)="onSubmit()" class="newsletter-form">
              <div class="form-group">
                <input
                  type="email"
                  [(ngModel)]="email"
                  name="email"
                  class="form-control"
                  placeholder="Enter your email address"
                  required
                >
              </div>

              <div *ngIf="message" class="newsletter-message" [class.success]="isSuccess" [class.error]="!isSuccess">
                {{ message }}
              </div>

              <button type="submit" class="subscribe-btn" [disabled]="isSubmitting">
                <span *ngIf="!isSubmitting">Subscribe Now</span>
                <span *ngIf="isSubmitting">Subscribing...</span>
              </button>

              <p class="privacy-note">
                We respect your privacy. Unsubscribe at any time.
              </p>

              <button type="button" class="skip-btn" (click)="close()">
                No thanks, I'll skip for now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    }

    .modal-container {
      background-color: #1c2541;
      border-radius: 10px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      position: relative;
      animation: slideIn 0.4s ease;
    }

    .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      background: none;
      border: none;
      color: #dfe6e9;
      font-size: 1.5rem;
      cursor: pointer;
      transition: color 0.2s ease;
      z-index: 10;
    }

    .close-btn:hover {
      color: #5acbd2;
    }

    .modal-content {
      padding: 30px;
      color: #dfe6e9;
    }

    .modal-header {
      text-align: center;
      margin-bottom: 25px;
    }

    .modal-title {
      color: #5acbd2;
      font-size: 1.8rem;
      margin-bottom: 10px;
    }

    .modal-subtitle {
      color: #fff;
      font-size: 1.1rem;
    }

    .newsletter-icon {
      text-align: center;
      margin-bottom: 20px;
    }

    .newsletter-icon i {
      font-size: 3rem;
      color: #5acbd2;
      background-color: rgba(90, 203, 210, 0.1);
      padding: 20px;
      border-radius: 50%;
    }

    .modal-description {
      margin-bottom: 15px;
      font-size: 1rem;
    }

    .benefit-list {
      list-style: none;
      padding: 0;
      margin-bottom: 25px;
    }

    .benefit-list li {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      font-size: 0.95rem;
    }

    .benefit-list i {
      color: #5acbd2;
      margin-right: 10px;
      font-size: 0.9rem;
    }

    .newsletter-form {
      margin-bottom: 0;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-control {
      width: 100%;
      background: #0b132b;
      border: 1px solid #2d3748;
      padding: 12px 15px;
      border-radius: 4px;
      color: #fff;
      transition: border-color 0.2s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: #5acbd2;
    }

    .newsletter-message {
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 15px;
      font-size: 0.9rem;
    }

    .success {
      background-color: rgba(72, 187, 120, 0.2);
      color: #48bb78;
    }

    .error {
      background-color: rgba(245, 101, 101, 0.2);
      color: #f56565;
    }

    .subscribe-btn {
      background-color: #5acbd2;
      border: none;
      color: #0b132b;
      font-weight: 600;
      width: 100%;
      padding: 12px 15px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      margin-bottom: 15px;
    }

    .subscribe-btn:hover {
      background-color: #4db5bc;
    }

    .subscribe-btn:disabled {
      background-color: #4a5568;
      cursor: not-allowed;
      color: #dfe6e9;
    }

    .privacy-note {
      font-size: 0.8rem;
      color: #b2bec3;
      text-align: center;
      margin-bottom: 20px;
    }

    .skip-btn {
      background: none;
      border: none;
      color: #b2bec3;
      font-size: 0.9rem;
      padding: 5px 10px;
      cursor: pointer;
      width: 100%;
      text-align: center;
      transition: color 0.2s ease;
    }

    .skip-btn:hover {
      color: #dfe6e9;
      text-decoration: underline;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from { transform: translateY(-30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class NewsletterModalComponent implements OnInit {
  @Output() closed = new EventEmitter<void>();

  email: string = '';
  isSubmitting: boolean = false;
  message: string = '';
  isSuccess: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Handle escape key press to close modal
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
  }

  onSubmit() {
    if (!this.email) {
      this.message = 'Please enter a valid email address';
      this.isSuccess = false;
      return;
    }

    this.isSubmitting = true;

    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, you would call a service to handle the subscription
      console.log('Modal - Subscribing with email:', this.email);

      this.isSubmitting = false;
      this.message = 'Thank you for subscribing to our newsletter!';
      this.isSuccess = true;

      // Reset form
      this.email = '';

      // Close modal after successful subscription with a slight delay
      setTimeout(() => {
        this.close();
      }, 3000);
    }, 1500);
  }

  close() {
    this.closed.emit();
  }

  closeModal(event: MouseEvent) {
    // Only close if clicking directly on the backdrop, not the modal content
    if (event.target === this.elementRef.nativeElement.querySelector('.modal-backdrop')) {
      this.close();
    }
  }
}
