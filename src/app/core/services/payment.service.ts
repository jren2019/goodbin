import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardType, CardTypeInfo, CreditCardService } from './credit-card.service';

export interface PaymentMethod {
  cardNumber: string;
  cvc: string;
  nameOnCard: string;
  expiryDate: string;
  cardType?: CardType;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentMethodSubject = new BehaviorSubject<PaymentMethod | null>(this.getStoredPaymentMethod());
  paymentMethod$ = this.paymentMethodSubject.asObservable();

  constructor(private creditCardService: CreditCardService) {}

  savePaymentMethod(paymentMethod: PaymentMethod): Observable<boolean> {
    // In a real app, you would send this to a secure server
    // For this demo, we'll just store it in localStorage (not secure)
    localStorage.setItem('payment_method', JSON.stringify(paymentMethod));
    this.paymentMethodSubject.next(paymentMethod);
    return new BehaviorSubject<boolean>(true).asObservable();
  }

  getPaymentMethod(): Observable<PaymentMethod | null> {
    return this.paymentMethod$;
  }

  private getStoredPaymentMethod(): PaymentMethod | null {
    const method = localStorage.getItem('payment_method');
    return method ? JSON.parse(method) : null;
  }

  detectCardType(cardNumber: string): CardTypeInfo {
    return this.creditCardService.detectCardType(cardNumber);
  }

  formatCardNumber(cardNumber: string): string {
    return this.creditCardService.formatCardNumber(cardNumber);
  }

  validateCardNumber(cardNumber: string): boolean {
    return this.creditCardService.validateCardNumber(cardNumber);
  }

  validateCVV(cvv: string, cardType: CardTypeInfo): boolean {
    return this.creditCardService.validateCVV(cvv, cardType);
  }

  validateExpiryDate(expiryDate: string): boolean {
    return this.creditCardService.validateExpiryDate(expiryDate);
  }

  // Helper method to get the card logo path
  getCardLogoPath(cardType: CardType): string {
    return `assets/images/cards/${cardType}.svg`;
  }
}
