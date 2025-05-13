import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Order {
  id: number;
  date: string;
  type: string;
  weight: number;
  price: number;
  status: 'pending' | 'completed' | 'cancelled';
  address?: string;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // Mock data for orders
  private mockOrders: Order[] = [
    {
      id: 1,
      date: '2023-05-15',
      type: 'E-Waste',
      weight: 5.2,
      price: 25.99,
      status: 'completed',
      address: '123 Green St, Eco City, EC 12345',
      notes: 'Left at front door'
    },
    {
      id: 2,
      date: '2023-06-02',
      type: 'Plastic',
      weight: 3.8,
      price: 15.20,
      status: 'completed',
      address: '123 Green St, Eco City, EC 12345'
    },
    {
      id: 3,
      date: '2023-06-20',
      type: 'Glass',
      weight: 7.5,
      price: 30.00,
      status: 'pending',
      address: '456 Recycle Ave, Eco City, EC 12345',
      notes: 'Please call before pickup'
    }
  ];

  constructor() {}

  getOrders(): Observable<Order[]> {
    // In a real app, you would fetch from a server
    // For this demo, we return mock data
    return of(this.mockOrders);
  }

  getOrderById(id: number): Observable<Order | undefined> {
    // In a real app, you would fetch from a server
    // For this demo, we find in mock data
    const order = this.mockOrders.find(o => o.id === id);
    return of(order);
  }

  addOrder(orderData: Partial<Order>): Observable<Order> {
    const newOrder: Order = {
      id: this.mockOrders.length > 0 ? Math.max(...this.mockOrders.map(o => o.id)) + 1 : 1,
      date: new Date().toISOString().split('T')[0],
      type: orderData.type || 'Unknown',
      weight: orderData.weight || 0,
      price: orderData.price || 0,
      status: 'pending',
      address: orderData.address,
      notes: orderData.notes
    };
    this.mockOrders = [newOrder, ...this.mockOrders];
    return of(newOrder);
  }
}
