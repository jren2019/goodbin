import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass, NgFor } from '@angular/common';

interface WinzQuoteData {
  address: string;
  wasteType: string;
  binSize: string;
  hirePeriod: string;
  extraDays: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-winz-dialog',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass, NgFor],
  templateUrl: './winz-dialog.component.html',
  styleUrls: ['./winz-dialog.component.scss']
})
export class WinzDialogComponent implements AfterViewInit {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() winzQuoteSubmitted = new EventEmitter<WinzQuoteData>();

  @ViewChild('deliveryDateInputRef') deliveryDateInputRef!: ElementRef<HTMLInputElement>;

  currentStep = 1;
  quoteData: WinzQuoteData = {
    address: '',
    wasteType: '',
    binSize: '',
    hirePeriod: '',
    extraDays: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  // Available waste types
  wasteTypes = [
    { value: 'general', label: 'General Waste', icon: 'trash-alt' },
    { value: 'hardfill', label: 'Hardfill', icon: 'dumpster' },
    { value: 'green', label: 'Green Waste', icon: 'seedling' }
  ];

  // Available bin sizes
  binSizes = [
    { value: '2m3', label: '2m³ - Small' },
    { value: '4m3', label: '4m³ - Medium' },
    { value: '6m3', label: '6m³ - Large' },
    { value: '9m3', label: '9m³ - Extra Large' }
  ];

  // Hire periods
  hirePeriods = [
    { value: '3', label: '3 days' },
    { value: '4', label: '4 Day Hire' },
    { value: '5', label: '5 days' },
    { value: '7', label: '7 days' },
    { value: '14', label: '14 days' }
  ];

  // Extra days options
  extraDaysOptions = [
    { value: '0', label: 'No extra days' },
    { value: '1', label: '1 Extra Day' },
    { value: '2', label: '2 days' },
    { value: '3', label: '3 days' },
    { value: '7', label: '7 days' }
  ];

  ngAfterViewInit() {
    // Initialization code if needed
  }

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
    this.resetDialog();
  }

  resetDialog() {
    this.currentStep = 1;
    this.quoteData = {
      address: '',
      wasteType: '',
      binSize: '',
      hirePeriod: '',
      extraDays: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
  }

  goToNextStep() {
    if (this.currentStep === 1 && this.quoteData.address.trim()) {
      this.currentStep = 2;
    } else if (this.currentStep === 2 && this.quoteData.wasteType) {
      this.currentStep = 3;
    } else if (this.currentStep === 3 && this.quoteData.binSize) {
      this.currentStep = 4;
    } else if (this.currentStep === 4 && this.quoteData.hirePeriod) {
      this.currentStep = 5;
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  completeQuote() {
    // Validate user details
    if (this.quoteData.firstName &&
        this.quoteData.lastName &&
        this.quoteData.email &&
        this.quoteData.phone) {
      this.winzQuoteSubmitted.emit(this.quoteData);
      this.close();
    }
  }

  getWasteTypeDescription(type: string): string {
    switch(type) {
      case 'general':
        return 'Household waste, furniture, timber, and other non-hazardous materials.';
      case 'hardfill':
        return 'Concrete, bricks, tiles, soil, and other construction waste.';
      case 'green':
        return 'Garden waste, leaves, branches, grass clippings, and other organic matter.';
      default:
        return '';
    }
  }

  getBinDescription(size: string): string {
    switch(size) {
      case '2m3':
        return 'Ideal for small house cleanups and garden waste. Fits approximately 2-3 trailer loads.';
      case '4m3':
        return 'Perfect for small renovations or medium house cleanups. Fits approximately 4-5 trailer loads.';
      case '6m3':
        return 'Great for larger renovations or major house cleanups. Fits approximately 6-7 trailer loads.';
      case '9m3':
        return 'Our largest option for major construction projects or complete house cleanouts. Fits approximately 9-10 trailer loads.';
      default:
        return '';
    }
  }

  isUserDetailsValid(): boolean {
    return !!(
      this.quoteData.firstName &&
      this.quoteData.lastName &&
      this.quoteData.email &&
      this.quoteData.phone
    );
  }

  closeOnBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
