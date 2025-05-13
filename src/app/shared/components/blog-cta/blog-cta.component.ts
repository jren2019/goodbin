import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-cta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="blog-cta-container">
      <div class="cta-content">
        <h3 class="cta-title">Stay Updated with GoodBins</h3>
        <p class="cta-description">
          Join our community of environmentally conscious individuals. Subscribe to get exclusive waste management tips, sustainable living guides, and special offers.
        </p>
      </div>

      <form (ngSubmit)="onSubmit()" class="cta-form">
        <div class="form-group">
          <input
            type="email"
            [(ngModel)]="email"
            name="email"
            class="form-control"
            placeholder="Your email address"
            required
          >
          <button type="submit" class="cta-submit-btn" [disabled]="isSubmitting">
            <span *ngIf="!isSubmitting">Subscribe</span>
            <span *ngIf="isSubmitting">Subscribing...</span>
          </button>
        </div>

        <div *ngIf="message" class="cta-message" [class.success]="isSuccess" [class.error]="!isSuccess">
          {{ message }}
        </div>

        <p class="cta-privacy">
          We respect your privacy. You can unsubscribe at any time.
        </p>
      </form>
    </div>
  `,
  styles: [`
    .blog-cta-container {
      background-color: #243056;
      border-radius: 8px;
      margin: 40px 0;
      padding: 30px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      border-left: 4px solid #5acbd2;
    }

    .cta-title {
      color: #fff;
      font-size: 1.5rem;
      margin-bottom: 15px;
    }

    .cta-description {
      color: #dfe6e9;
      margin-bottom: 25px;
      font-size: 1rem;
      line-height: 1.6;
    }

    .cta-form {
      margin-bottom: 0;
    }

    .form-group {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
    }

    @media (max-width: 576px) {
      .form-group {
        flex-direction: column;
      }
    }

    .form-control {
      flex: 1;
      background: #1c2541;
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

    .cta-submit-btn {
      background-color: #5acbd2;
      border: none;
      color: #0b132b;
      font-weight: 600;
      padding: 0 25px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      white-space: nowrap;
    }

    .cta-submit-btn:hover {
      background-color: #4db5bc;
    }

    .cta-submit-btn:disabled {
      background-color: #4a5568;
      cursor: not-allowed;
      color: #dfe6e9;
    }

    .cta-privacy {
      font-size: 0.8rem;
      color: #b2bec3;
      margin-top: 10px;
    }

    .cta-message {
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
  `]
})
export class BlogCtaComponent {
  email: string = '';
  isSubmitting: boolean = false;
  message: string = '';
  isSuccess: boolean = false;

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
      console.log('Blog CTA - Subscribing with email:', this.email);

      this.isSubmitting = false;
      this.message = 'Thank you for subscribing to our newsletter!';
      this.isSuccess = true;

      // Reset form
      this.email = '';

      // Clear success message after 5 seconds
      setTimeout(() => {
        this.message = '';
      }, 5000);
    }, 1500);
  }
}
