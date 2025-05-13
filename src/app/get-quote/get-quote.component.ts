import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Add Font Awesome imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMapMarkerAlt,
  faDumpster,
  faCalendarAlt,
  faClock,
  faChevronDown,
  faTruckLoading,
  faDollarSign,
  faRecycle
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-get-quote',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FontAwesomeModule],
  templateUrl: './get-quote.component.html',
  styleUrls: [
    './get-quote.component.css',
    '../shared/form-enhancements.scss'
  ]
})
export class GetQuoteComponent implements OnInit, AfterViewInit {
  // Font Awesome icons
  faMapMarkerAlt = faMapMarkerAlt;
  faDumpster = faDumpster;
  faCalendarAlt = faCalendarAlt;
  faClock = faClock;
  faChevronDown = faChevronDown;
  faTruckLoading = faTruckLoading;
  faDollarSign = faDollarSign;
  faRecycle = faRecycle;

  quoteData = {
    email: '',
    mobile: '',
    binType: 'general_waste',
    suburb: 'east_auckland',
    address: '',
    binSize: '6m3',
    deliveryDate: '',
    hirePeriod: '3_days',
    instructions: ''
  };

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    // No initialization needed for now
  }

  ngAfterViewInit(): void {
    // Initialize form micro-interactions
    this.initializeFormInteractions();
  }

  // Initialize all form element interactions
  private initializeFormInteractions(): void {
    // Add focus/blur handlers for form inputs
    const formInputs = this.el.nativeElement.querySelectorAll('.form-input, .form-select, .form-textarea, select, input, textarea');

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
    const buttons = this.el.nativeElement.querySelectorAll('button[type="submit"], .btn');
    buttons.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', (event) => {
        // Create ripple effect
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const ripple = this.renderer.createElement('span');
        this.renderer.addClass(ripple, 'ripple-effect');
        this.renderer.setStyle(ripple, 'top', y + 'px');
        this.renderer.setStyle(ripple, 'left', x + 'px');
        this.renderer.appendChild(button, ripple);

        setTimeout(() => {
          this.renderer.removeChild(button, ripple);
        }, 600);
      });
    });
  }

  onSubmit() {
    console.log('Quote submitted:', this.quoteData);
    // Here you would implement the actual form submission
    alert('Thank you for your quote request! We will get back to you soon.');
  }
}
