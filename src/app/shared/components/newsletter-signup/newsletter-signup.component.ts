import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="newsletter-container">
      <h3 class="newsletter-title">Subscribe to Our Newsletter</h3>
      <p class="newsletter-description">Get the latest waste management tips, eco-friendly practices, and special offers delivered to your inbox.</p>

      <form (ngSubmit)="onSubmit()" class="newsletter-form">
        <div class="form-group">
          <input
            type="email"
            [(ngModel)]="email"
            name="email"
            class="form-control"
            placeholder="Your email address"
            required
          >
        </div>

        <div class="newsletter-options">
          <div class="checkbox-group">
            <input
              type="checkbox"
              [(ngModel)]="subscribeToUpdates"
              id="updates"
              name="updates"
              class="newsletter-checkbox"
            >
            <label for="updates">Waste management tips & updates</label>
          </div>

          <div class="checkbox-group">
            <input
              type="checkbox"
              [(ngModel)]="subscribeToOffers"
              id="offers"
              name="offers"
              class="newsletter-checkbox"
            >
            <label for="offers">Special offers & promotions</label>
          </div>
        </div>

        <div *ngIf="message" class="newsletter-message" [class.success]="isSuccess" [class.error]="!isSuccess">
          {{ message }}
        </div>

        <button type="submit" class="newsletter-submit-btn" [disabled]="isSubmitting">
          <span *ngIf="!isSubmitting">Subscribe Now</span>
          <span *ngIf="isSubmitting">Subscribing...</span>
        </button>
      </form>

      <p class="newsletter-privacy">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  `,
  styles: [`
    .newsletter-container {
      background: #1c2541;
      border-radius: 8px;
      padding: 25px;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
    }

    .newsletter-title {
      font-size: 1.3rem;
      color: #5acbd2;
      margin-bottom: 15px;
      font-weight: 600;
      position: relative;
      padding-bottom: 10px;
    }

    .newsletter-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 3px;
      background-color: #5acbd2;
    }

    .newsletter-description {
      color: #dfe6e9;
      font-size: 0.95rem;
      margin-bottom: 20px;
    }

    .newsletter-form {
      margin-bottom: 15px;
    }

    .form-control {
      background: #0b132b;
      border: 1px solid #2d3748;
      padding: 12px 15px;
      border-radius: 4px;
      color: #fff;
      width: 100%;
      margin-bottom: 15px;
      transition: border-color 0.2s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: #5acbd2;
    }

    .newsletter-options {
      margin-bottom: 20px;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }

    .newsletter-checkbox {
      margin-right: 10px;
      accent-color: #5acbd2;
    }

    .checkbox-group label {
      color: #dfe6e9;
      font-size: 0.9rem;
    }

    .newsletter-submit-btn {
      background-color: #5acbd2;
      border: none;
      color: #0b132b;
      font-weight: 600;
      width: 100%;
      padding: 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .newsletter-submit-btn:hover {
      background-color: darken(#5acbd2, 10%);
    }

    .newsletter-submit-btn:disabled {
      background-color: #4a5568;
      cursor: not-allowed;
      color: #dfe6e9;
    }

    .newsletter-privacy {
      font-size: 0.8rem;
      color: #b2bec3;
      text-align: center;
      margin-top: 15px;
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
  `]
})
export class NewsletterSignupComponent {
  email: string = '';
  subscribeToUpdates: boolean = true;
  subscribeToOffers: boolean = false;
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
      console.log('Subscribing with email:', this.email);
      console.log('Updates:', this.subscribeToUpdates);
      console.log('Offers:', this.subscribeToOffers);

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
