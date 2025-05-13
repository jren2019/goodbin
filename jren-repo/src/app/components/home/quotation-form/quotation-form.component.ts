import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation-form',
  templateUrl: './quotation-form.component.html',
  styleUrl: './quotation-form.component.scss'
})
export class QuotationFormComponent {

  email: string = '';
  mobile: string = '';
  selectedBinType: string = '';
  selectedSuburb: string = '';
  selectedBinSize: string = '2m3';
  price: string = '';
  price_actual: string = '';

  constructor(private router: Router) {
  }

  updatePrice(): void {
    if (this.selectedBinSize === '9m3') {
      this.price = '$450 INC GST';
      this.price_actual = '$450 INC GST';
    } else {
      this.price = '$360 INC GST';
      this.price_actual = '$360 INC GST';
    }
  }
}
