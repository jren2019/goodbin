import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { PaymentMethod, PaymentService } from '../core/services/payment.service';
import { Order, OrderService } from '../core/services/order.service';
import { CardType, CardTypeInfo } from '../core/services/credit-card.service';
import { Address, AddressService } from '../core/services/address.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username = '';
  activeTab = 'payment';
  paymentMethod: PaymentMethod = {
    cardNumber: '',
    cvc: '',
    nameOnCard: '',
    expiryDate: ''
  };
  orders: Order[] = [];
  saveSuccess = false;
  isSaving = false;

  // Card validation properties
  cardTypeInfo: CardTypeInfo | null = null;
  cardErrors = {
    number: '',
    cvc: '',
    expiry: ''
  };

  // Address related properties
  addresses: Address[] = [];
  currentAddress: Address = this.getEmptyAddress();
  editingAddress: boolean = false;
  addressSaved: boolean = false;
  addressDeleted: boolean = false;
  isSavingAddress: boolean = false;

  // Avatar related
  userAvatar: string | null = null;

  constructor(
    private authService: AuthService,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private addressService: AddressService
  ) {}

  private getEmptyAddress(): Address {
    return {
      id: '',
      nickname: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      isDefault: false
    };
  }

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.username = user.username;
      // load stored avatar
      this.userAvatar = user.avatarUrl || null;
    }

    // Get saved payment method if any
    this.paymentService.getPaymentMethod().subscribe(method => {
      if (method) {
        this.paymentMethod = method;
      }
    });

    // Get orders
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });

    // Get addresses
    this.loadAddresses();
  }

  loadAddresses() {
    this.addressService.getAddresses().subscribe(addresses => {
      this.addresses = addresses;
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.saveSuccess = false; // Reset success message when switching tabs
  }

  onCardNumberChange() {
    // Format the card number with spaces
    if (this.paymentMethod.cardNumber) {
      this.paymentMethod.cardNumber = this.paymentService.formatCardNumber(this.paymentMethod.cardNumber);

      // Detect card type
      this.cardTypeInfo = this.paymentService.detectCardType(this.paymentMethod.cardNumber);
      this.paymentMethod.cardType = this.cardTypeInfo.type;

      // Validate card number
      if (this.paymentMethod.cardNumber.length > 0) {
        const isValid = this.paymentService.validateCardNumber(this.paymentMethod.cardNumber);
        this.cardErrors.number = isValid ? '' : 'Invalid card number';
      } else {
        this.cardErrors.number = '';
      }
    } else {
      this.cardTypeInfo = null;
      this.paymentMethod.cardType = undefined;
      this.cardErrors.number = '';
    }
  }

  onCvcChange() {
    if (this.paymentMethod.cvc && this.cardTypeInfo) {
      const isValid = this.paymentService.validateCVV(this.paymentMethod.cvc, this.cardTypeInfo);
      this.cardErrors.cvc = isValid ? '' : `CVC must be ${this.cardTypeInfo.cvvLength} digits`;
    } else {
      this.cardErrors.cvc = '';
    }
  }

  onExpiryDateChange() {
    if (this.paymentMethod.expiryDate) {
      // Format expiry date
      if (this.paymentMethod.expiryDate.length === 2 && !this.paymentMethod.expiryDate.includes('/')) {
        this.paymentMethod.expiryDate += '/';
      }

      // Validate expiry date if it looks complete
      if (this.paymentMethod.expiryDate.length >= 5) {
        const isValid = this.paymentService.validateExpiryDate(this.paymentMethod.expiryDate);
        this.cardErrors.expiry = isValid ? '' : 'Invalid or expired date';
      } else {
        this.cardErrors.expiry = '';
      }
    } else {
      this.cardErrors.expiry = '';
    }
  }

  getCardLogoPath(): string {
    if (this.cardTypeInfo) {
      return this.paymentService.getCardLogoPath(this.cardTypeInfo.type);
    }
    return 'assets/images/cards/unknown.svg';
  }

  validateForm(): boolean {
    // Check card number
    this.onCardNumberChange();

    // Check CVC
    this.onCvcChange();

    // Check expiry date
    this.onExpiryDateChange();

    // Form is valid if we have no errors
    return !this.cardErrors.number && !this.cardErrors.cvc && !this.cardErrors.expiry;
  }

  onPaymentSubmit() {
    this.isSaving = true;
    this.saveSuccess = false;

    // First validate all fields
    if (!this.validateForm()) {
      this.isSaving = false;
      return;
    }

    this.paymentService.savePaymentMethod(this.paymentMethod).subscribe({
      next: () => {
        this.saveSuccess = true;
        this.isSaving = false;
      },
      error: () => {
        this.isSaving = false;
      }
    });
  }

  editAddress(address: Address) {
    this.currentAddress = { ...address };
    this.editingAddress = true;
    this.scrollToAddressForm();
  }

  cancelEditing() {
    this.currentAddress = this.getEmptyAddress();
    this.editingAddress = false;
  }

  deleteAddress(id: string) {
    if (confirm('Are you sure you want to delete this address?')) {
      this.addressService.deleteAddress(id).subscribe({
        next: () => {
          this.addressDeleted = true;
          this.addressSaved = false;
          this.loadAddresses();

          // Auto-hide the deleted message after 3 seconds
          setTimeout(() => {
            this.addressDeleted = false;
          }, 3000);
        }
      });
    }
  }

  setDefaultAddress(id: string) {
    this.addressService.setDefaultAddress(id).subscribe({
      next: () => {
        this.loadAddresses();
      }
    });
  }

  onAddressSubmit() {
    this.isSavingAddress = true;
    this.addressSaved = false;
    this.addressDeleted = false;

    const saveObservable = this.editingAddress
      ? this.addressService.updateAddress(this.currentAddress)
      : this.addressService.addAddress(this.currentAddress);

    saveObservable.subscribe({
      next: () => {
        this.isSavingAddress = false;
        this.addressSaved = true;
        this.loadAddresses();

        // Reset form after successful save
        this.currentAddress = this.getEmptyAddress();
        this.editingAddress = false;

        // Auto-hide the success message after 3 seconds
        setTimeout(() => {
          this.addressSaved = false;
        }, 3000);
      },
      error: () => {
        this.isSavingAddress = false;
      }
    });
  }

  private scrollToAddressForm() {
    setTimeout(() => {
      const formElement = document.querySelector('.address-form-container');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        this.userAvatar = result;
        // save in AuthService
        this.authService.updateAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  }
}
