import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <section class="page-header">
      <div class="container">
        <h1>Order Online</h1>
        <div class="title-underline"></div>
      </div>
    </section>

    <section class="bins-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Our Bins</h2>
          <div class="title-underline"></div>
          <p class="section-intro">Our good bins come in different sizes and take different types of waste.</p>
        </div>

        <div class="bins-info">
          <p>Rubbish bins can be used for general rubbish and garden waste combined, but if you have hard waste like bricks and soil, then a hardfill skip bin is the one for you.</p>
          <p>Unsure what size to order? Check out our guide below. Our biggest rubbish skip bin can take up to ten trailer loads of waste, and our smallest takes one trailer load.</p>
          <p>If you're still unsure and have more questions, just <a href="#contact" class="text-link">get in touch</a> and we can help you choose the right bin!</p>
        </div>

        <div class="bins-gallery">
          <div class="bin-card">
            <div class="bin-image">
              <img src="https://ext.same-assets.com/3591989571/2853328101.jpeg" alt="2m³ Skip Bin">
              <span class="bin-tag">Most Popular</span>
            </div>
            <div class="bin-details">
              <h3>2m³ Skip Bin</h3>
              <ul class="bin-features">
                <li><i class="icon">✓</i> Ideal for small home cleanups</li>
                <li><i class="icon">✓</i> Fits up to 2 trailer loads</li>
                <li><i class="icon">✓</i> Dimensions: 1.5m × 1.5m × 0.9m</li>
              </ul>
              <div class="bin-price">
                <span class="price">From $150</span>
                <button class="order-btn" (click)="scrollToOrderForm()">Order Now</button>
              </div>
            </div>
          </div>

          <div class="bin-card">
            <div class="bin-image">
              <img src="https://ext.same-assets.com/3591989571/2853328101.jpeg" alt="4m³ Skip Bin">
            </div>
            <div class="bin-details">
              <h3>4m³ Skip Bin</h3>
              <ul class="bin-features">
                <li><i class="icon">✓</i> Perfect for medium projects</li>
                <li><i class="icon">✓</i> Fits up to 4 trailer loads</li>
                <li><i class="icon">✓</i> Dimensions: 2m × 1.5m × 1.2m</li>
              </ul>
              <div class="bin-price">
                <span class="price">From $220</span>
                <button class="order-btn" (click)="scrollToOrderForm()">Order Now</button>
              </div>
            </div>
          </div>

          <div class="bin-card">
            <div class="bin-image">
              <img src="https://ext.same-assets.com/3591989571/2853328101.jpeg" alt="6m³ Skip Bin">
            </div>
            <div class="bin-details">
              <h3>6m³ Skip Bin</h3>
              <ul class="bin-features">
                <li><i class="icon">✓</i> Ideal for major renovations</li>
                <li><i class="icon">✓</i> Fits up to 6 trailer loads</li>
                <li><i class="icon">✓</i> Dimensions: 3m × 1.5m × 1.4m</li>
              </ul>
              <div class="bin-price">
                <span class="price">From $290</span>
                <button class="order-btn" (click)="scrollToOrderForm()">Order Now</button>
              </div>
            </div>
          </div>
        </div>

        <div id="order-form" class="order-form-section">
          <h3 class="form-title">Complete Your Order</h3>
          <div class="title-underline"></div>

          <form class="order-form">
            <div class="form-grid">
              <div class="form-group">
                <label for="fullName">Full Name*</label>
                <input type="text" id="fullName" placeholder="Your Name" required>
              </div>

              <div class="form-group">
                <label for="email">Email*</label>
                <input type="email" id="email" placeholder="Your Email" required>
              </div>

              <div class="form-group">
                <label for="phone">Phone*</label>
                <input type="tel" id="phone" placeholder="Your Phone Number" required>
              </div>

              <div class="form-group">
                <label for="address">Delivery Address*</label>
                <input type="text" id="address" placeholder="Street Address" [value]="addressFromUrl" required>
              </div>

              <div class="form-group">
                <label for="suburb">Suburb*</label>
                <select id="suburb" required>
                  <option value="" disabled selected>Select Suburb</option>
                  <option value="east_auckland">East Auckland</option>
                  <option value="south_auckland">South Auckland</option>
                </select>
              </div>

              <div class="form-group">
                <label for="binType">Bin Type*</label>
                <select id="binType" required>
                  <option value="" disabled selected>Select Bin Type</option>
                  <option value="2m3" [selected]="binSizeFromUrl === '2m3'">2m³ Skip Bin ($150)</option>
                  <option value="4m3" [selected]="binSizeFromUrl === '4m3'">4m³ Skip Bin ($220)</option>
                  <option value="6m3" [selected]="binSizeFromUrl === '6m3'">6m³ Skip Bin ($290)</option>
                  <option value="9m3" [selected]="binSizeFromUrl === '9m3'">9m³ Skip Bin ($350)</option>
                </select>
              </div>

              <div class="form-group">
                <label for="wasteType">Waste Type*</label>
                <select id="wasteType" required>
                  <option value="" disabled selected>Select Waste Type</option>
                  <option value="general" [selected]="wasteTypeFromUrl === 'general'">General Waste</option>
                  <option value="hardfill" [selected]="wasteTypeFromUrl === 'hardfill'">Hardfill</option>
                  <option value="green" [selected]="wasteTypeFromUrl === 'green'">Green Waste</option>
                  <option value="mixed" [selected]="wasteTypeFromUrl === 'mixed'">Mixed</option>
                </select>
              </div>

              <div class="form-group">
                <label for="deliveryDate">Delivery Date*</label>
                <input type="date" id="deliveryDate" [value]="deliveryDateFromUrl" required>
              </div>

              <div class="form-group">
                <label for="hirePeriod">Hire Period*</label>
                <select id="hirePeriod" required>
                  <option value="" disabled selected>Select Hire Period</option>
                  <option value="3" [selected]="hirePeriodFromUrl === '3'">3 days</option>
                  <option value="5" [selected]="hirePeriodFromUrl === '5'">5 days</option>
                  <option value="7" [selected]="hirePeriodFromUrl === '7'">7 days</option>
                  <option value="14" [selected]="hirePeriodFromUrl === '14'">14 days</option>
                </select>
              </div>

              <div class="form-group">
                <label for="extraDays">Extra Days</label>
                <select id="extraDays">
                  <option value="0" [selected]="extraDaysFromUrl === '0' || !extraDaysFromUrl">No extra days</option>
                  <option value="1" [selected]="extraDaysFromUrl === '1'">1 day ($10)</option>
                  <option value="2" [selected]="extraDaysFromUrl === '2'">2 days ($20)</option>
                  <option value="3" [selected]="extraDaysFromUrl === '3'">3 days ($30)</option>
                  <option value="7" [selected]="extraDaysFromUrl === '7'">7 days ($60)</option>
                </select>
              </div>

              <div class="form-group full-width">
                <label for="notes">Special Instructions (Optional)</label>
                <textarea id="notes" rows="4" placeholder="Any special instructions for delivery or pickup" [value]="specialInstructionsFromUrl"></textarea>
              </div>
            </div>

            <div class="agreement">
              <label class="checkbox-container">
                <input type="checkbox" required>
                <span class="checkmark"></span>
                I agree to the <a href="#" class="text-link">terms and conditions</a>
              </label>
            </div>

            <button type="submit" class="submit-btn">Complete Order</button>
          </form>
        </div>

        <div class="cta-container">
          <div class="cta-box">
            <h3>Need help choosing the right bin?</h3>
            <p>Our team is ready to assist you in finding the perfect solution for your waste disposal needs.</p>
            <div class="cta-buttons">
              <a href="tel:02040936279" class="phone-btn"><i class="icon">📞</i> Call 020 4093 6279</a>
              <a href="mailto:gooddayremovals&#64;hotmail.com" class="quote-btn">Email Us</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <app-footer></app-footer>
  `,
  styles: [`
    /* Page Header */
    .page-header {
      background-color: #0b132b;
      color: #fff;
      padding: 6rem 0 2rem;
      text-align: center;
      margin-bottom: 0;
      border-bottom: 1px solid rgba(90, 203, 210, 0.2);
    }

    .page-header h1 {
      font-size: 2.8rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #fff;
    }

    .page-header .title-underline {
      height: 3px;
      width: 80px;
      background: #e61960;
      margin: 0 auto;
    }

    /* Bins Section */
    .bins-section {
      padding: 4rem 0 6rem;
      background-color: #0b132b;
      color: #a8b2d1;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-title {
      font-size: 2.5rem;
      color: #fff;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .title-underline {
      height: 3px;
      width: 80px;
      background: #e61960;
      margin: 0 auto 1.5rem;
    }

    .section-intro {
      font-size: 1.2rem;
      max-width: 700px;
      margin: 0 auto;
      color: #a8b2d1;
    }

    .bins-info {
      max-width: 800px;
      margin: 0 auto 3rem;
      text-align: center;
    }

    .bins-info p {
      margin-bottom: 1rem;
      line-height: 1.7;
      color: #a8b2d1;
    }

    .text-link {
      color: #5acbd2;
      text-decoration: none;
      font-weight: 600;
      position: relative;
    }

    .text-link::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -2px;
      left: 0;
      background-color: #5acbd2;
      transition: width 0.3s ease;
    }

    .text-link:hover::after {
      width: 100%;
    }

    .bins-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .bin-card {
      background-color: #131d3b;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .bin-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
      border-left: 3px solid #5acbd2;
    }

    .bin-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .bin-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .bin-card:hover .bin-image img {
      transform: scale(1.05);
    }

    .bin-tag {
      position: absolute;
      top: 1rem;
      right: 0;
      background-color: #e61960;
      color: #fff;
      padding: 0.4rem 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 4px 0 0 4px;
    }

    .bin-details {
      padding: 1.5rem;
    }

    .bin-details h3 {
      font-size: 1.4rem;
      color: #fff;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .bin-features {
      list-style: none;
      padding: 0;
      margin: 0 0 1.5rem;
    }

    .bin-features li {
      display: flex;
      align-items: center;
      margin-bottom: 0.8rem;
      color: #a8b2d1;
      font-size: 0.95rem;
    }

    .icon {
      color: #5acbd2;
      margin-right: 0.5rem;
      font-weight: bold;
    }

    .bin-price {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1.5rem;
    }

    .price {
      font-size: 1.2rem;
      font-weight: 700;
      color: #fff;
    }

    .order-btn {
      background-color: #5acbd2;
      color: #0b132b;
      padding: 0.6rem 1.2rem;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
    }

    .order-btn:hover {
      background-color: #46b8bf;
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    /* Order Form Section */
    .order-form-section {
      background-color: #131d3b;
      border-radius: 10px;
      padding: 3rem;
      margin: 3rem 0;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    .form-title {
      font-size: 1.8rem;
      color: #fff;
      text-align: center;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .order-form {
      margin-top: 2rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    .form-group {
      margin-bottom: 0;
    }

    .full-width {
      grid-column: span 2;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #fff;
      font-size: 0.9rem;
    }

    input, select, textarea {
      width: 100%;
      padding: 0.8rem 1rem;
      border: 1px solid rgba(90, 203, 210, 0.2);
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.05);
      color: #fff;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    input::placeholder, textarea::placeholder {
      color: rgba(168, 178, 209, 0.6);
    }

    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #5acbd2;
      box-shadow: 0 0 0 3px rgba(90, 203, 210, 0.1);
      background-color: rgba(255, 255, 255, 0.1);
    }

    .agreement {
      margin: 2rem 0;
    }

    .checkbox-container {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #a8b2d1;
      font-size: 0.9rem;
    }

    .checkbox-container input {
      width: auto;
      margin-right: 10px;
    }

    .submit-btn {
      background-color: #e61960;
      color: #fff;
      border: none;
      padding: 1rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
      margin-top: 1rem;
    }

    .submit-btn:hover {
      background-color: #d01555;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    /* CTA Box */
    .cta-container {
      margin-top: 4rem;
    }

    .cta-box {
      background-color: #131d3b;
      color: #fff;
      border-radius: 8px;
      padding: 3rem;
      text-align: center;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(90, 203, 210, 0.1);
    }

    .cta-box h3 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      font-weight: 600;
      color: #fff;
    }

    .cta-box p {
      color: #a8b2d1;
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .phone-btn, .quote-btn {
      display: inline-flex;
      align-items: center;
      padding: 0.8rem 1.5rem;
      border-radius: 4px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .phone-btn {
      background-color: transparent;
      border: 2px solid #5acbd2;
      color: #fff;
    }

    .phone-btn:hover {
      background-color: rgba(90, 203, 210, 0.1);
      color: #5acbd2;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .quote-btn {
      background-color: #e61960;
      color: #fff;
    }

    .quote-btn:hover {
      background-color: #d01555;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    /* Responsive Design */
    @media (max-width: 992px) {
      .bins-gallery {
        grid-template-columns: repeat(2, 1fr);
      }

      .form-grid {
        grid-template-columns: 1fr;
      }

      .full-width {
        grid-column: span 1;
      }
    }

    @media (max-width: 768px) {
      .bins-section {
        padding: 3rem 0 4rem;
      }

      .page-header h1 {
        font-size: 2.2rem;
      }

      .section-title {
        font-size: 2rem;
      }

      .bins-gallery {
        grid-template-columns: 1fr;
      }

      .order-form-section {
        padding: 2rem 1.5rem;
      }

      .cta-box {
        padding: 2rem;
      }

      .cta-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class ShopComponent implements OnInit {
  addressFromUrl: string = '';
  wasteTypeFromUrl: string = '';
  binSizeFromUrl: string = '';
  deliveryDateFromUrl: string = '';
  hirePeriodFromUrl: string = '';
  extraDaysFromUrl: string = '';
  specialInstructionsFromUrl: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get booking data from URL params if available
    this.route.queryParams.subscribe(params => {
      if (params['address']) {
        this.addressFromUrl = params['address'];
      }

      if (params['wasteType']) {
        this.wasteTypeFromUrl = params['wasteType'];
      }

      if (params['binSize']) {
        this.binSizeFromUrl = params['binSize'];
      }

      if (params['deliveryDate']) {
        this.deliveryDateFromUrl = params['deliveryDate'];
      }

      if (params['hirePeriod']) {
        this.hirePeriodFromUrl = params['hirePeriod'];
      }

      if (params['extraDays']) {
        this.extraDaysFromUrl = params['extraDays'];
      }

      if (params['specialInstructions']) {
        this.specialInstructionsFromUrl = params['specialInstructions'];
      }

      // Auto-scroll to order form if booking data is provided
      if (params['address'] || params['wasteType'] || params['binSize'] || params['deliveryDate']) {
        setTimeout(() => {
          this.scrollToOrderForm();
        }, 300);
      }
    });
  }

  scrollToOrderForm() {
    const element = document.getElementById('order-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
