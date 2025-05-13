import { Injectable } from '@angular/core';

export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'dinersclub' | 'jcb' | 'unknown';

export interface CardTypeInfo {
  type: CardType;
  name: string;
  pattern: RegExp;
  gaps: number[];
  lengths: number[];
  cvvLength: number;
  luhn: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private cardTypes: CardTypeInfo[] = [
    {
      type: 'visa',
      name: 'Visa',
      pattern: /^4/,
      gaps: [4, 8, 12],
      lengths: [16, 18, 19],
      cvvLength: 3,
      luhn: true
    },
    {
      type: 'mastercard',
      name: 'Mastercard',
      pattern: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)/,
      gaps: [4, 8, 12],
      lengths: [16],
      cvvLength: 3,
      luhn: true
    },
    {
      type: 'amex',
      name: 'American Express',
      pattern: /^3[47]/,
      gaps: [4, 10],
      lengths: [15],
      cvvLength: 4,
      luhn: true
    },
    {
      type: 'discover',
      name: 'Discover',
      pattern: /^(6011|65|64[4-9]|622)/,
      gaps: [4, 8, 12],
      lengths: [16, 19],
      cvvLength: 3,
      luhn: true
    },
    {
      type: 'dinersclub',
      name: 'Diners Club',
      pattern: /^(36|38|30[0-5])/,
      gaps: [4, 10],
      lengths: [14, 16, 19],
      cvvLength: 3,
      luhn: true
    },
    {
      type: 'jcb',
      name: 'JCB',
      pattern: /^35/,
      gaps: [4, 8, 12],
      lengths: [16, 19],
      cvvLength: 3,
      luhn: true
    }
  ];

  constructor() { }

  /**
   * Determines the card type based on the card number
   */
  detectCardType(cardNumber: string): CardTypeInfo {
    // Remove all non-digits
    const sanitizedNumber = this.sanitizeCardNumber(cardNumber);

    // Find the matching card type
    for (const card of this.cardTypes) {
      if (card.pattern.test(sanitizedNumber)) {
        return card;
      }
    }

    // Default to unknown
    return {
      type: 'unknown',
      name: 'Unknown',
      pattern: /^/,
      gaps: [4, 8, 12],
      lengths: [16],
      cvvLength: 3,
      luhn: false
    };
  }

  /**
   * Format a card number with spaces based on card type
   */
  formatCardNumber(cardNumber: string): string {
    const sanitizedNumber = this.sanitizeCardNumber(cardNumber);

    if (!sanitizedNumber) {
      return '';
    }

    const cardType = this.detectCardType(sanitizedNumber);
    const { gaps } = cardType;

    let result = '';
    let currentPosition = 0;

    // Add characters with gaps
    for (let i = 0; i < sanitizedNumber.length; i++) {
      if (gaps.includes(i)) {
        result += ' ';
      }
      result += sanitizedNumber[i];
      currentPosition++;
    }

    return result;
  }

  /**
   * Removes all non-digits from the card number
   */
  sanitizeCardNumber(cardNumber: string): string {
    return cardNumber.replace(/\D/g, '');
  }

  /**
   * Validates a card number using Luhn algorithm
   */
  validateCardNumber(cardNumber: string): boolean {
    const sanitizedNumber = this.sanitizeCardNumber(cardNumber);

    if (!sanitizedNumber) {
      return false;
    }

    const cardType = this.detectCardType(sanitizedNumber);

    // Check if the length is valid for this card type
    if (!cardType.lengths.includes(sanitizedNumber.length)) {
      return false;
    }

    // Skip Luhn check if not required
    if (!cardType.luhn) {
      return true;
    }

    // Luhn algorithm implementation
    let sum = 0;
    let shouldDouble = false;

    // Walk through the digits in reverse
    for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitizedNumber.charAt(i), 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  }

  /**
   * Validates a CVV based on card type
   */
  validateCVV(cvv: string, cardType: CardTypeInfo): boolean {
    const sanitizedCVV = cvv.replace(/\D/g, '');
    return sanitizedCVV.length === cardType.cvvLength;
  }

  /**
   * Validates an expiry date (MM/YY format)
   */
  validateExpiryDate(expiryDate: string): boolean {
    // Format should be MM/YY
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      return false;
    }

    const [monthStr, yearStr] = expiryDate.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10) + 2000; // Convert YY to 20YY

    // Check if month is valid
    if (month < 1 || month > 12) {
      return false;
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // JS months are 0-based

    // Check if date is in the past
    return (year > currentYear) || (year === currentYear && month >= currentMonth);
  }
}
