import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newsletter-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="newsletter-button-container">
      <button class="newsletter-button" (click)="showModal.emit()">
        <i class="far fa-envelope"></i>
        <span class="newsletter-text">Subscribe to Newsletter</span>
      </button>
    </div>
  `,
  styles: [`
    .newsletter-button-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 99;
    }

    .newsletter-button {
      display: flex;
      align-items: center;
      gap: 10px;
      background-color: #5acbd2;
      color: #0b132b;
      border: none;
      border-radius: 30px;
      padding: 12px 20px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .newsletter-button:hover {
      background-color: #4db5bc;
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
    }

    .newsletter-button i {
      font-size: 1.2rem;
    }

    @media (max-width: 576px) {
      .newsletter-text {
        display: none;
      }

      .newsletter-button {
        padding: 12px;
        border-radius: 50%;
      }

      .newsletter-button i {
        margin: 0;
      }
    }
  `]
})
export class NewsletterButtonComponent {
  @Output() showModal = new EventEmitter<void>();
}
