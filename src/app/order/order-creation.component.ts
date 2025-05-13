import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Order, OrderService } from '../core/services/order.service';
import { Address, AddressService } from '../core/services/address.service';

@Component({
  selector: 'app-order-creation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="order-create-container">
      <h2>Create a New Order</h2>
      <form (ngSubmit)="onSubmit()" #orderForm="ngForm">
        <div class="form-group">
          <label for="type">Waste Type</label>
          <input id="type" name="type" [(ngModel)]="orderData.type" required />
        </div>
        <div class="form-group">
          <label for="weight">Weight (kg)</label>
          <input type="number" id="weight" name="weight" [(ngModel)]="orderData.weight" required min="0.1" step="0.1" />
        </div>
        <div class="form-group">
          <label for="address">Pickup Address</label>
          <select id="address" name="address" [(ngModel)]="orderData.address" required>
            <option *ngFor="let addr of addresses" [value]="addr.street + ', ' + addr.city">{{ addr.nickname }} - {{ addr.street }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="notes">Additional Notes</label>
          <textarea id="notes" name="notes" [(ngModel)]="orderData.notes"></textarea>
        </div>
        <button type="submit" [disabled]="!orderForm.form.valid || isSubmitting">{{ isSubmitting ? 'Ordering...' : 'Place Order' }}</button>
      </form>
    </div>
  `,
  styles: [`
    .order-create-container { max-width: 600px; margin: auto; padding: 2rem; }
    .form-group { margin-bottom: 1rem; }
    label { display: block; margin-bottom: 0.5rem; }
    input, select, textarea, button { width: 100%; padding: 0.5rem; }
    button { margin-top: 1rem; background: #e61960; color: white; border: none; cursor: pointer; }
  `]
})
export class OrderCreationComponent implements OnInit {
  addresses: Address[] = [];
  // Initialize orderData without null for weight
  orderData: Partial<Order> = { type: '', address: '', notes: '' };
  isSubmitting = false;

  constructor(
    private orderService: OrderService,
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.addressService.getAddresses().subscribe(addrs => this.addresses = addrs);
    const typeParam = this.route.snapshot.queryParamMap.get('type');
    if (typeParam) this.orderData.type = typeParam;
  }

  onSubmit() {
    if (!this.orderData.type || !this.orderData.weight || !this.orderData.address) return;
    this.isSubmitting = true;
    this.orderService.addOrder(this.orderData).subscribe(newOrder => {
      this.isSubmitting = false;
      this.router.navigate(['/profile']);
    });
  }
}
