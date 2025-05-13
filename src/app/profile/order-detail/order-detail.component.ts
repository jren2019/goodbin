import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Order, OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="order-detail-container">
      <div class="order-header">
        <h1>Order Details</h1>
        <button class="back-button" (click)="goBack()">
          ← Back to Orders
        </button>
      </div>

      <div class="order-content">
        <div *ngIf="loading" class="loading">
          <p>Loading order details...</p>
        </div>

        <div *ngIf="error" class="error-message">
          <p>{{ error }}</p>
          <button class="btn-link" (click)="goBack()">Go back to your orders</button>
        </div>

        <div *ngIf="order && !loading" class="order-info">
          <div class="order-card">
            <div class="order-title">
              <h2>Order #{{ order.id }}</h2>
              <span class="status-badge" [class]="order.status">
                {{ order.status }}
              </span>
            </div>

            <div class="order-details">
              <div class="order-detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">{{ order.date }}</span>
              </div>

              <div class="order-detail-row">
                <span class="detail-label">Type:</span>
                <span class="detail-value">{{ order.type }}</span>
              </div>

              <div class="order-detail-row">
                <span class="detail-label">Weight:</span>
                <span class="detail-value">{{ order.weight }} kg</span>
              </div>

              <div class="order-detail-row">
                <span class="detail-label">Amount:</span>
                <span class="detail-value">{{ order.price | currency }}</span>
              </div>

              <div class="order-detail-row" *ngIf="order.address">
                <span class="detail-label">Address:</span>
                <span class="detail-value">{{ order.address }}</span>
              </div>

              <div class="order-detail-row" *ngIf="order.notes">
                <span class="detail-label">Notes:</span>
                <span class="detail-value">{{ order.notes }}</span>
              </div>
            </div>
          </div>

          <div class="order-actions">
            <button *ngIf="order.status === 'pending'" class="btn-cancel">
              Cancel Order
            </button>

            <button *ngIf="order.status === 'completed'" class="btn-reorder">
              Order Again
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .order-detail-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .order-header h1 {
      color: #0b132b;
      margin: 0;
    }

    .back-button {
      background: none;
      border: none;
      color: #5acbd2;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: color 0.3s;
    }

    .back-button:hover {
      color: #4bb1b7;
    }

    .order-content {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .loading, .error-message {
      padding: 3rem;
      text-align: center;
      color: #6c757d;
    }

    .error-message {
      color: #721c24;
    }

    .btn-link {
      background: none;
      border: none;
      color: #5acbd2;
      text-decoration: underline;
      cursor: pointer;
      padding: 0;
      font-size: 1rem;
    }

    .order-info {
      padding: 2rem;
    }

    .order-card {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .order-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e1e4e8;
    }

    .order-title h2 {
      margin: 0;
      color: #0b132b;
      font-size: 1.5rem;
    }

    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: capitalize;
    }

    .status-badge.completed {
      background-color: #d4edda;
      color: #155724;
    }

    .status-badge.pending {
      background-color: #fff3cd;
      color: #856404;
    }

    .status-badge.cancelled {
      background-color: #f8d7da;
      color: #721c24;
    }

    .order-details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .order-detail-row {
      display: flex;
      border-bottom: 1px solid #e1e4e8;
      padding-bottom: 0.5rem;
    }

    .detail-label {
      width: 100px;
      font-weight: 600;
      color: #0b132b;
    }

    .detail-value {
      flex: 1;
      color: #4a5568;
    }

    .order-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
    }

    .btn-cancel, .btn-reorder {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .btn-cancel {
      background-color: #f8d7da;
      color: #721c24;
    }

    .btn-cancel:hover {
      background-color: #f5c6cb;
    }

    .btn-reorder {
      background-color: #5acbd2;
      color: white;
    }

    .btn-reorder:hover {
      background-color: #4bb1b7;
    }

    @media (max-width: 576px) {
      .order-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .order-title {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .order-detail-row {
        flex-direction: column;
      }

      .detail-label {
        width: 100%;
        margin-bottom: 0.25rem;
      }
    }
  `]
})
export class OrderDetailComponent implements OnInit {
  orderId: number | null = null;
  order: Order | undefined;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.orderId = parseInt(id, 10);
        this.loadOrderDetails();
      } else {
        this.error = 'Invalid order ID';
        this.loading = false;
      }
    });
  }

  loadOrderDetails() {
    if (this.orderId === null) {
      this.error = 'Invalid order ID';
      this.loading = false;
      return;
    }

    this.orderService.getOrderById(this.orderId).subscribe({
      next: (order) => {
        if (order) {
          this.order = order;
        } else {
          this.error = 'Order not found';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load order details';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/profile'], { queryParams: { tab: 'orders' } });
  }
}
