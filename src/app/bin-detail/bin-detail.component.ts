import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { BinService } from '../shared/services/bin.service';
import { Bin } from '../shared/models/bin.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-bin-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterModule],
  template: `
    <app-navbar></app-navbar>

    <section class="bin-detail-hero" *ngIf="bin">
      <div class="container">
        <div class="breadcrumbs">
          <a routerLink="/">Home</a> &gt;
          <a routerLink="/services">Our Bins</a> &gt;
          <span>{{ bin.name }}</span>
        </div>
        <h1 class="bin-title">{{ bin.name }}</h1>
      </div>
    </section>

    <!-- Delivery Address Alert -->
    <section *ngIf="deliveryAddress" class="address-alert">
      <div class="container">
        <div class="alert-content">
          <div class="alert-icon">📍</div>
          <div class="alert-text">
            <p>Delivering to: <strong>{{ deliveryAddress }}</strong></p>
            <p class="alert-note">Complete your order with the form below</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bin-detail-content" *ngIf="bin">
      <div class="container">
        <div class="bin-detail-grid">
          <div class="bin-image-container">
            <div class="bin-image">
              <img [src]="bin.imagePath" alt="{{ bin.name }}">
              <div *ngIf="bin.isPopular" class="popular-badge">Most Popular</div>
            </div>
            <div class="bin-size-indicator">
              <div class="size-badge">{{ bin.size }}</div>
              <div class="trailer-loads">
                <svg viewBox="0 0 24 24" class="trailer-icon">
                  <path d="M3,18 L7,18 L7,16 L3,16 L3,18 Z M20,18 L21,18 L21,16 L20,16 L20,18 Z M22,7.5 C22,7.22 21.78,7 21.5,7 L18,7 L18,13 L21.47,13 C21.97,13 22.39,12.65 22.47,12.16 L23.87,7.66 C23.95,7.6 23.97,7.55 23.97,7.5 Z M14,9 L14,5 L3,5 C1.9,5 1,5.9 1,7 L1,15 L3,15 C3,16.66 4.34,18 6,18 C7.66,18 9,16.66 9,15 L15,15 C15,16.66 16.34,18 18,18 C19.66,18 21,16.66 21,15 L23,15 L23,11 L14,11 L14,9 Z" fill="currentColor"/>
                </svg>
                <span>{{ bin.trailerLoads }} trailer load<span *ngIf="bin.trailerLoads > 1">s</span></span>
              </div>
            </div>
          </div>

          <div class="bin-details-container">
            <div class="bin-description">
              <p>{{ bin.description }}</p>
            </div>

            <div class="bin-specifications">
              <h2>Specifications</h2>

              <div class="specs-grid">
                <div class="spec-group">
                  <h3>Dimensions</h3>
                  <ul class="spec-list">
                    <li><strong>Length:</strong> {{ bin.dimensions.length }}</li>
                    <li><strong>Width:</strong> {{ bin.dimensions.width }}</li>
                    <li><strong>Height:</strong> {{ bin.dimensions.height }}</li>
                  </ul>
                </div>

                <div class="spec-group">
                  <h3>Weight Limit</h3>
                  <p class="weight-limit">{{ bin.weight.maxWeight }}{{ bin.weight.weightUnit }}</p>
                  <p class="weight-warning" *ngIf="bin.weight.maxWeight">
                    Overweight charges will apply if bin exceeds weight limit.
                  </p>
                </div>
              </div>
            </div>

            <div class="usage-guidelines">
              <div class="suitable-for">
                <h3>Suitable For</h3>
                <ul class="guideline-list">
                  <li *ngFor="let use of bin.suitableFor">{{ use }}</li>
                </ul>
              </div>

              <div class="restrictions">
                <h3>Restrictions</h3>
                <ul class="restriction-list">
                  <li *ngFor="let restriction of bin.restrictions">{{ restriction }}</li>
                </ul>
              </div>
            </div>

            <div class="bin-pricing">
              <div class="price-container">
                <h3>Price</h3>
                <div class="price">{{ bin.pricing.price }}</div>
                <div class="price-details">{{ bin.pricing.hireLength }}</div>
              </div>

              <button (click)="scrollToQuote()" class="book-btn">Book This Bin</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Ready to book your {{ bin?.size }} bin?</h2>
          <p class="cta-desc">Get in touch today to book your bin or ask any questions you might have.</p>
          <div class="cta-buttons">
            <a href="tel:02040936279" class="phone-btn">
              <svg viewBox="0 0 24 24" class="btn-icon">
                <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5C20.55,15.5 21,15.95 21,16.5V20C21,20.55 20.55,21 20,21C10.61,21 3,13.39 3,4C3,3.45 3.45,3 4,3H7.5C8.05,3 8.5,3.45 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" fill="currentColor"/>
              </svg>
              020 4093 6279
            </a>
            <button (click)="scrollToQuote()" class="quote-btn">Get a Quote</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Order form section -->
    <section id="quote" class="order-form-section">
      <div class="container">
        <h2 class="section-title">Book Your Bin</h2>
        <p class="section-desc">Complete the form below to order your bin</p>

        <div class="order-form-container">
          <form class="order-form">
            <div class="form-grid">
              <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" placeholder="Your Name" required>
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Your Email" required>
              </div>

              <div class="form-group">
                <label for="phone">Phone</label>
                <input type="tel" id="phone" placeholder="Your Phone Number" required>
              </div>

              <div class="form-group">
                <label for="date">Delivery Date</label>
                <input type="date" id="date" required>
              </div>

              <div class="form-group full-width">
                <label for="address">Delivery Address</label>
                <input type="text" id="address" [value]="deliveryAddress || ''" placeholder="Enter delivery address" required>
              </div>

              <div class="form-group full-width">
                <label for="instructions">Delivery Instructions</label>
                <textarea id="instructions" rows="3" placeholder="Any special instructions for delivery?"></textarea>
              </div>
            </div>

            <div class="order-summary">
              <h3>Order Summary</h3>
              <div class="summary-item">
                <span>Bin Type:</span>
                <span>{{ bin?.name }}</span>
              </div>
              <div class="summary-item">
                <span>Size:</span>
                <span>{{ bin?.size }}</span>
              </div>
              <div class="summary-item">
                <span>Price:</span>
                <span>{{ bin?.pricing?.price }}</span>
              </div>
              <div class="summary-item">
                <span>Hire Period:</span>
                <span>{{ bin?.pricing?.hireLength }}</span>
              </div>
            </div>

            <button type="submit" class="submit-btn">Complete Order</button>
          </form>
        </div>
      </div>
    </section>

    <section class="other-bins-section">
      <div class="container">
        <h2 class="section-title">Other Bin Options</h2>
        <p class="section-desc">Not quite what you're looking for? Check out our other bin options.</p>
        <div class="other-bins-cta">
          <a routerLink="/services" class="view-all-btn">View All Bins</a>
        </div>
      </div>
    </section>

    <app-footer></app-footer>
  `,
  styles: [`
    /* Hero section */
    .bin-detail-hero {
      background-color: #0b132b;
      padding: 3rem 0 2rem;
      margin-top: 70px;
      border-bottom: 1px solid rgba(90, 203, 210, 0.1);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .breadcrumbs {
      color: #a8b2d1;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }

    .breadcrumbs a {
      color: #5acbd2;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .breadcrumbs a:hover {
      color: #fff;
    }

    .bin-title {
      font-size: 2.5rem;
      color: #fff;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    /* Address Alert */
    .address-alert {
      background-color: #5acbd2;
      padding: 1rem 0;
    }

    .alert-content {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.1);
    }

    .alert-icon {
      font-size: 1.5rem;
    }

    .alert-text {
      flex: 1;
    }

    .alert-text p {
      margin: 0;
      color: #0b132b;
      font-size: 1.1rem;
    }

    .alert-note {
      font-size: 0.9rem !important;
      opacity: 0.8;
    }

    /* Content section */
    .bin-detail-content {
      background-color: #0b132b;
      padding: 3rem 0;
      color: #a8b2d1;
    }

    .bin-detail-grid {
      display: grid;
      grid-template-columns: 40% 60%;
      gap: 3rem;
    }

    /* Bin image */
    .bin-image-container {
      position: relative;
    }

    .bin-image {
      position: relative;
      background-color: #131d3b;
      border-radius: 8px;
      padding: 1.5rem;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .bin-image img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }

    .popular-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background-color: #e61960;
      color: white;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.3rem 0.8rem;
      border-radius: 4px;
      transform: rotate(5deg);
      z-index: 2;
    }

    .bin-size-indicator {
      display: flex;
      justify-content: space-between;
      background-color: #131d3b;
      border-radius: 8px;
      padding: 1rem;
      margin-top: 1rem;
      align-items: center;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .size-badge {
      font-size: 2rem;
      font-weight: 700;
      color: #fff;
    }

    .trailer-loads {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #fff;
      font-size: 0.9rem;
    }

    .trailer-icon {
      width: 24px;
      height: 24px;
      color: #5acbd2;
    }

    /* Bin details */
    .bin-details-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .bin-description {
      font-size: 1.1rem;
      line-height: 1.6;
    }

    .bin-specifications h2,
    .usage-guidelines h3,
    .bin-pricing h3 {
      color: #fff;
      margin-bottom: 1rem;
    }

    .bin-specifications h2 {
      font-size: 1.8rem;
      font-weight: 600;
    }

    .specs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .spec-group h3 {
      font-size: 1.3rem;
      color: #fff;
      margin-bottom: 1rem;
      font-weight: 500;
    }

    .spec-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .spec-list li {
      margin-bottom: 0.5rem;
    }

    .weight-limit {
      font-size: 1.5rem;
      font-weight: 600;
      color: #fff;
      margin-bottom: 0.3rem;
    }

    .weight-warning {
      color: #e61960;
      font-size: 0.9rem;
    }

    .usage-guidelines {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-top: 1rem;
    }

    .guideline-list, .restriction-list {
      list-style: none;
      padding: 0;
    }

    .guideline-list li, .restriction-list li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }

    .guideline-list li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #5acbd2;
      font-weight: bold;
    }

    .restriction-list li:before {
      content: "✕";
      position: absolute;
      left: 0;
      color: #e61960;
      font-weight: bold;
    }

    .bin-pricing {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #131d3b;
      border-radius: 8px;
      padding: 1.5rem;
      margin-top: 1rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .price {
      font-size: 2.2rem;
      font-weight: 700;
      color: #fff;
    }

    .price-details {
      color: #a8b2d1;
      font-size: 0.9rem;
    }

    .book-btn {
      display: inline-block;
      background-color: #5acbd2;
      color: #0b132b;
      padding: 0.9rem 2rem;
      border-radius: 5px;
      text-decoration: none;
      font-weight: 700;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
    }

    .book-btn:hover {
      background-color: #46b8bf;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    /* CTA Section */
    .cta-section {
      padding: 4rem 0;
      background-color: #131d3b;
      border-top: 1px solid rgba(90, 203, 210, 0.1);
    }

    .cta-content {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }

    .cta-title {
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: #fff;
    }

    .cta-desc {
      font-size: 1.2rem;
      margin-bottom: 2.5rem;
      color: #a8b2d1;
    }

    .cta-buttons {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .phone-btn, .quote-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.8rem 1.5rem;
      border-radius: 5px;
      font-weight: 600;
      font-size: 1.1rem;
      text-decoration: none;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
    }

    .phone-btn {
      background-color: #5acbd2;
      color: #0b132b;
    }

    .phone-btn:hover {
      background-color: #46b8bf;
      transform: translateY(-3px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .quote-btn {
      background-color: #e61960;
      color: white;
    }

    .quote-btn:hover {
      background-color: #d01555;
      transform: translateY(-3px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .btn-icon {
      width: 20px;
      height: 20px;
      margin-right: 0.5rem;
    }

    /* Order form section */
    .order-form-section {
      padding: 4rem 0;
      background-color: #0b132b;
      border-top: 1px solid rgba(90, 203, 210, 0.1);
    }

    .order-form-container {
      background-color: #131d3b;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      max-width: 800px;
      margin: 0 auto;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
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
      font-weight: 500;
    }

    input, textarea {
      width: 100%;
      padding: 0.8rem 1rem;
      border: 1px solid rgba(90, 203, 210, 0.2);
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.05);
      color: #fff;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    input:focus, textarea:focus {
      outline: none;
      border-color: #5acbd2;
      box-shadow: 0 0 0 3px rgba(90, 203, 210, 0.1);
      background-color: rgba(255, 255, 255, 0.1);
    }

    .order-summary {
      background-color: #0b132b;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      border: 1px solid rgba(90, 203, 210, 0.2);
    }

    .order-summary h3 {
      color: #fff;
      margin-bottom: 1rem;
      font-size: 1.3rem;
      font-weight: 600;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.8rem;
      padding-bottom: 0.8rem;
      border-bottom: 1px solid rgba(90, 203, 210, 0.1);
      color: #a8b2d1;
    }

    .summary-item:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .summary-item span:last-child {
      font-weight: 600;
      color: #fff;
    }

    .submit-btn {
      background-color: #5acbd2;
      color: #0b132b;
      border: none;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      font-weight: 700;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
    }

    .submit-btn:hover {
      background-color: #46b8bf;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    /* Other bins section */
    .other-bins-section {
      padding: 4rem 0;
      background-color: #0b132b;
      border-top: 1px solid rgba(90, 203, 210, 0.1);
      text-align: center;
    }

    .section-title {
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #fff;
    }

    .section-desc {
      color: #a8b2d1;
      margin-bottom: 2rem;
      font-size: 1.1rem;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }

    .view-all-btn {
      display: inline-block;
      background-color: transparent;
      color: #5acbd2;
      border: 2px solid #5acbd2;
      padding: 0.8rem 2rem;
      border-radius: 5px;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
      transition: all 0.3s ease;
    }

    .view-all-btn:hover {
      background-color: rgba(90, 203, 210, 0.1);
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    /* Responsive */
    @media (max-width: 992px) {
      .bin-detail-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .bin-image {
        max-width: 500px;
        margin: 0 auto;
      }

      .bin-size-indicator {
        max-width: 500px;
        margin: 1rem auto 0;
      }
    }

    @media (max-width: 768px) {
      .bin-title {
        font-size: 2rem;
      }

      .specs-grid, .usage-guidelines {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .bin-pricing {
        flex-direction: column;
        gap: 1.5rem;
        text-align: center;
      }

      .cta-title {
        font-size: 1.8rem;
      }

      .cta-desc {
        font-size: 1rem;
      }

      .section-title {
        font-size: 1.8rem;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }

      .full-width {
        grid-column: span 1;
      }
    }
  `]
})
export class BinDetailComponent implements OnInit {
  bin?: Bin;
  deliveryAddress: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private binService: BinService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const binId = params.get('id');
        return this.binService.getBinById(binId || '');
      })
    ).subscribe(bin => {
      this.bin = bin;
    });

    // Check for address parameter from services page
    this.route.queryParams.subscribe(params => {
      if (params['address']) {
        this.deliveryAddress = params['address'];

        // If address is provided, scroll to the quote section after a short delay
        setTimeout(() => {
          this.scrollToQuote();
        }, 1000);
      }
    });
  }

  scrollToQuote(): void {
    document.getElementById('quote')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
