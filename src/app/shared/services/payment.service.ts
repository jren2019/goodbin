import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PaymentMethod } from '../models/payment.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentMethodsSubject = new BehaviorSubject<PaymentMethod[]>([]);
  public paymentMethods: Observable<PaymentMethod[]> = this.paymentMethodsSubject.asObservable();

  constructor(private authService: AuthService) {
    // Load payment methods from localStorage when service initializes
    this.loadPaymentMethods();

    // Listen for user login/logout to update payment methods
    this.authService.currentUser.subscribe(user => {
      if (!user) {
        this.paymentMethodsSubject.next([]);
      } else {
        this.loadPaymentMethods();
      }
    });
  }

  private loadPaymentMethods(): void {
    const user = this.authService.currentUserValue;
    if (!user) {
      this.paymentMethodsSubject.next([]);
      return;
    }

    const storedPaymentMethods = localStorage.getItem(`paymentMethods_${user.id}`);
    if (storedPaymentMethods) {
      this.paymentMethodsSubject.next(JSON.parse(storedPaymentMethods));
    } else {
      this.paymentMethodsSubject.next([]);
    }
  }

  private savePaymentMethods(methods: PaymentMethod[]): void {
    const user = this.authService.currentUserValue;
    if (!user) return;

    localStorage.setItem(`paymentMethods_${user.id}`, JSON.stringify(methods));
    this.paymentMethodsSubject.next(methods);
  }

  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.paymentMethods;
  }

  addPaymentMethod(paymentMethod: PaymentMethod): Observable<PaymentMethod> {
    const methods = [...this.paymentMethodsSubject.value];
    const newMethod = {
      ...paymentMethod,
      id: Math.random().toString(36).substr(2, 9)
    };

    // If isDefault is set to true, set all other methods to non-default
    if (newMethod.isDefault) {
      methods.forEach(method => method.isDefault = false);
    }

    // If this is the first method, set it as default
    if (methods.length === 0) {
      newMethod.isDefault = true;
    }

    methods.push(newMethod);
    this.savePaymentMethods(methods);

    return of(newMethod);
  }

  updatePaymentMethod(id: string, paymentMethod: PaymentMethod): Observable<PaymentMethod> {
    const methods = [...this.paymentMethodsSubject.value];
    const index = methods.findIndex(m => m.id === id);

    if (index === -1) {
      throw new Error('Payment method not found');
    }

    // If this method is being set as default, update all others
    if (paymentMethod.isDefault) {
      methods.forEach(method => method.isDefault = false);
    }

    methods[index] = { ...methods[index], ...paymentMethod, id };
    this.savePaymentMethods(methods);

    return of(methods[index]);
  }

  deletePaymentMethod(id: string): Observable<boolean> {
    const methods = [...this.paymentMethodsSubject.value];
    const index = methods.findIndex(m => m.id === id);

    if (index === -1) {
      return of(false);
    }

    const wasDefault = methods[index].isDefault;
    methods.splice(index, 1);

    // If we removed the default method and there are other methods,
    // set the first one as default
    if (wasDefault && methods.length > 0) {
      methods[0].isDefault = true;
    }

    this.savePaymentMethods(methods);
    return of(true);
  }

  getDefaultPaymentMethod(): Observable<PaymentMethod | null> {
    const methods = this.paymentMethodsSubject.value;
    const defaultMethod = methods.find(m => m.isDefault);
    return of(defaultMethod || null);
  }
}
