import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Address {
  id: string;
  nickname: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

@Injectable({ providedIn: 'root' })
export class AddressService {
  private storageKey = 'goodbins_addresses';
  private addressesSubject = new BehaviorSubject<Address[]>(this.loadAddresses());

  getAddresses(): Observable<Address[]> {
    return this.addressesSubject.asObservable();
  }

  addAddress(address: Address): Observable<Address[]> {
    const addresses = this.loadAddresses();
    // ensure only one default
    if (address.isDefault) {
      addresses.forEach(a => a.isDefault = false);
    }
    const newAddress = { ...address, id: this.generateId() };
    const updated = [...addresses, newAddress];
    this.saveAddresses(updated);
    this.addressesSubject.next(updated);
    return of(updated);
  }

  updateAddress(address: Address): Observable<Address[]> {
    let addresses = this.loadAddresses();
    if (address.isDefault) {
      addresses.forEach(a => a.isDefault = false);
    }
    addresses = addresses.map(a => a.id === address.id ? { ...address } : a);
    this.saveAddresses(addresses);
    this.addressesSubject.next(addresses);
    return of(addresses);
  }

  deleteAddress(id: string): Observable<void> {
    let addresses = this.loadAddresses().filter(a => a.id !== id);
    this.saveAddresses(addresses);
    this.addressesSubject.next(addresses);
    return of();
  }

  setDefaultAddress(id: string): Observable<Address[]> {
    let addresses = this.loadAddresses().map(a => ({ ...a, isDefault: a.id === id }));
    this.saveAddresses(addresses);
    this.addressesSubject.next(addresses);
    return of(addresses);
  }

  private loadAddresses(): Address[] {
    const json = localStorage.getItem(this.storageKey);
    try {
      return json ? JSON.parse(json) as Address[] : [];
    } catch {
      return [];
    }
  }

  private saveAddresses(addresses: Address[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(addresses));
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
