import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-aquotation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './get-aquotation.component.html',
  styleUrl: './get-aquotation.component.scss'
})
export class GetAQuotationComponent {
  email: string = '';
  mobile: string = '';
  selectedBinType: string = '';
  selectedSuburb: string = '';
  selectedBinSize: string = '2m3';
  price: string = '';
  price_actual: string = '';

  constructor() { }

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
