import { Component, EventEmitter, Input, Output, OnInit, Renderer2, AfterViewInit, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass, NgFor, CommonModule } from '@angular/common';

interface BookingData {
  address: string;
  wasteType: string;
  binSize: string;
  deliveryDate: string;
  hirePeriod: string;
  extraDays: string;
  specialInstructions: string;
}

@Component({
  selector: 'app-address-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgClass, NgFor],
  templateUrl: './address-dialog.component.html',
  styleUrls: [
    './address-dialog.component.scss',
    '../shared/form-enhancements.scss'
  ]
})
export class AddressDialogComponent implements OnInit, AfterViewInit {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() bookingDataSubmitted = new EventEmitter<BookingData>();

  currentStep = 1;
  bookingData: BookingData = {
    address: '',
    wasteType: '',
    binSize: '',
    deliveryDate: '',
    hirePeriod: '',
    extraDays: '',
    specialInstructions: ''
  };

  // Available waste types
  wasteTypes = [
    { value: 'general', label: 'General Waste', icon: 'trash' },
    { value: 'hardfill', label: 'Hardfill', icon: 'bricks' },
    { value: 'green', label: 'Green Waste', icon: 'leaf' },
    { value: 'mixed', label: 'Mixed Waste', icon: 'recycle' }
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
    { value: '5', label: '5 days' },
    { value: '7', label: '7 days' },
    { value: '14', label: '14 days' }
  ];

  // Extra days options
  extraDaysOptions = [
    { value: '0', label: 'No extra days' },
    { value: '1', label: '1 day ($10)' },
    { value: '2', label: '2 days ($20)' },
    { value: '3', label: '3 days ($30)' },
    { value: '7', label: '7 days ($60)' }
  ];

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    // No initialization logic required for now
  }

  ngAfterViewInit(): void {
    // Initialize form micro-interactions
    this.initializeFormInteractions();
  }

  // Initialize all form element interactions
  private initializeFormInteractions(): void {
    // Add focus/blur handlers for form inputs
    const formInputs = this.el.nativeElement.querySelectorAll('.form-input, .form-select, .form-textarea');

    formInputs.forEach((input: HTMLElement) => {
      // Get parent form group
      const formGroup = input.closest('.form-group');
      if (!formGroup) return;

      // Add focus handler
      this.renderer.listen(input, 'focus', () => {
        this.renderer.addClass(formGroup, 'focused');
      });

      // Add blur handler
      this.renderer.listen(input, 'blur', () => {
        this.renderer.removeClass(formGroup, 'focused');

        // Add has-value class if input has a value
        if (input.tagName === 'SELECT') {
          if ((input as HTMLSelectElement).value) {
            this.renderer.addClass(formGroup, 'has-value');
          } else {
            this.renderer.removeClass(formGroup, 'has-value');
          }
        } else {
          if ((input as HTMLInputElement).value) {
            this.renderer.addClass(formGroup, 'has-value');
          } else {
            this.renderer.removeClass(formGroup, 'has-value');
          }
        }
      });

      // Check initial value
      if (input.tagName === 'SELECT') {
        if ((input as HTMLSelectElement).value) {
          this.renderer.addClass(formGroup, 'has-value');
        }
      } else {
        if ((input as HTMLInputElement).value) {
          this.renderer.addClass(formGroup, 'has-value');
        }
      }
    });

    // Enhance date inputs
    const dateInputs = this.el.nativeElement.querySelectorAll('input[type="date"]');
    dateInputs.forEach((dateInput: HTMLElement) => {
      const dateContainer = dateInput.closest('.form-group');
      if (dateContainer) {
        this.renderer.addClass(dateContainer, 'date-input-container');
      }

      // Show success after selection
      this.renderer.listen(dateInput, 'change', () => {
        const formGroup = dateInput.closest('.form-group');
        if (formGroup) {
          // Show brief success animation
          this.renderer.addClass(formGroup, 'success');
          setTimeout(() => {
            this.renderer.removeClass(formGroup, 'success');
          }, 2000);
        }
      });
    });

    // Add ripple effect to buttons
    const buttons = this.el.nativeElement.querySelectorAll('.next-btn, .previous-btn');
    buttons.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', () => {
        // Add pulse animation on click
        this.renderer.addClass(button, 'pulse');
        setTimeout(() => {
          this.renderer.removeClass(button, 'pulse');
        }, 300);
      });
    });
  }

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
    this.resetDialog();
  }

  resetDialog() {
    this.currentStep = 1;
    this.bookingData = {
      address: '',
      wasteType: '',
      binSize: '',
      deliveryDate: '',
      hirePeriod: '',
      extraDays: '',
      specialInstructions: ''
    };
  }

  goToNextStep() {
    if (this.currentStep === 1 && this.bookingData.address.trim()) {
      this.currentStep = 2;
    } else if (this.currentStep === 2 && this.bookingData.wasteType) {
      this.currentStep = 3;
    } else if (this.currentStep === 3 && this.bookingData.binSize) {
      this.currentStep = 4;
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  completeBooking() {
    // At least require delivery date and hire period
    if (this.bookingData.deliveryDate && this.bookingData.hirePeriod) {
      this.bookingDataSubmitted.emit(this.bookingData);
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
      case 'mixed':
        return 'A combination of different waste types including general and green waste.';
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

  isServiceOptionsValid(): boolean {
    return !!(this.bookingData.deliveryDate && this.bookingData.hirePeriod);
  }

  closeOnBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
