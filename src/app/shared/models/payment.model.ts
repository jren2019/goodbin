export interface PaymentMethod {
  id?: string;
  cardNumber: string;
  nameOnCard: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault?: boolean;
}
