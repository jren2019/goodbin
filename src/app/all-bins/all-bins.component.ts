import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { OrderCreationComponent } from '../order/order-creation.component';
import { RouterModule } from '@angular/router';
import { BinService } from '../shared/services/bin.service';
import { Bin, BinCategory } from '../shared/models/bin.model';

@Component({
  selector: 'app-all-bins',
  standalone: true,
  imports: [FooterComponent, CommonModule, RouterModule],
  template: `
    <section class="hero">
      <div class="container">
        <h1>Our Bins</h1>
        <p class="hero-intro">
          Our skip bins come in different sizes and take different types of waste.
        </p>
        <p class="hero-desc">
          Whether you need bins for general waste, garden waste, or construction materials like bricks and soil, we have the right solution for your project.
        </p>
        <p class="hero-desc">
          Unsure what size to order? Browse our range below or <a href="#contact" class="text-link">get in touch</a> and we can help you choose the right bin for your needs.
        </p>
      </div>
    </section>

    <!-- Delivery Address Alert -->
    <section *ngIf="deliveryAddress" class="address-alert">
      <div class="container">
        <div class="alert-content">
          <div class="alert-icon">📍</div>
          <div class="alert-text">
            <p>Delivering to: <strong>{{ deliveryAddress }}</strong></p>
            <p class="alert-note">Select a bin below to continue your order</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bins-section">
      <div class="container">
        <h2 class="section-title">General Waste Bins</h2>
        <p class="section-desc">Use for household waste, garden waste, and general rubbish</p>

        <div class="bins-grid">
          <div *ngFor="let bin of generalBins" class="bin-card">
            <div class="bin-image">
              <img [src]="bin.imagePath" alt="{{ bin.name }}">
              <div *ngIf="bin.isPopular" class="popular-badge">Most Popular</div>
            </div>
            <div class="bin-content">
              <h3 class="bin-title">{{ bin.size }} {{ bin.name }}</h3>
              <p class="bin-desc">{{ bin.shortDescription }}</p>

              <div class="bin-specs">
                <div class="spec-item">
                  <span class="spec-label">Dimensions:</span>
                  <span class="spec-value">{{ bin.dimensions.length }} x {{ bin.dimensions.width }} x {{ bin.dimensions.height }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Weight Limit:</span>
                  <span class="spec-value">{{ bin.weight.maxWeight }}{{ bin.weight.weightUnit }}</span>
                </div>
                <div class="spec-item trailer-loads">
                  <svg viewBox="0 0 24 24" class="trailer-icon">
                    <path d="M3,18 L7,18 L7,16 L3,16 L3,18 Z M20,18 L21,18 L21,16 L20,16 L20,18 Z M22,7.5 C22,7.22 21.78,7 21.5,7 L18,7 L18,13 L21.47,13 C21.97,13 22.39,12.65 22.47,12.16 L23.87,7.66 C23.95,7.6 23.97,7.55 23.97,7.5 Z M14,9 L14,5 L3,5 C1.9,5 1,5.9 1,7 L1,15 L3,15 C3,16.66 4.34,18 6,18 C7.66,18 9,16.66 9,15 L15,15 C15,16.66 16.34,18 18,18 C19.66,18 21,16.66 21,15 L23,15 L23,11 L14,11 L14,9 Z" fill="currentColor"/>
                  </svg>
                  <span>{{ bin.trailerLoads }} trailer load<span *ngIf="bin.trailerLoads > 1">s</span></span>
                </div>
              </div>

              <div class="bin-price">
                <span class="price">{{ bin.pricing.price }}</span>
                <span class="price-period">{{ bin.pricing.hireLength }}</span>
              </div>

              <div class="bin-actions">
                <a [routerLink]="['/bin', bin.id]" class="read-more-btn">Read More</a>
                <a [routerLink]="['/bin', bin.id]" [queryParams]="{address: deliveryAddress}" class="book-btn">Book Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bins-section hardfill-section">
      <div class="container">
        <h2 class="section-title">Hardfill Bins</h2>
        <p class="section-desc">Use for soil, concrete, bricks, rocks and stone</p>

        <div class="bins-grid">
          <div *ngFor="let bin of hardfillBins" class="bin-card">
            <div class="bin-image">
              <img [src]="bin.imagePath" alt="{{ bin.name }}">
              <div *ngIf="bin.isPopular" class="popular-badge">Most Popular</div>
            </div>
            <div class="bin-content">
              <h3 class="bin-title">{{ bin.size }} {{ bin.name }}</h3>
              <p class="bin-desc">{{ bin.shortDescription }}</p>

              <div class="bin-specs">
                <div class="spec-item">
                  <span class="spec-label">Dimensions:</span>
                  <span class="spec-value">{{ bin.dimensions.length }} x {{ bin.dimensions.width }} x {{ bin.dimensions.height }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Weight Limit:</span>
                  <span class="spec-value">{{ bin.weight.maxWeight }}{{ bin.weight.weightUnit }}</span>
                </div>
                <div class="spec-item trailer-loads">
                  <svg viewBox="0 0 24 24" class="trailer-icon">
                    <path d="M3,18 L7,18 L7,16 L3,16 L3,18 Z M20,18 L21,18 L21,16 L20,16 L20,18 Z M22,7.5 C22,7.22 21.78,7 21.5,7 L18,7 L18,13 L21.47,13 C21.97,13 22.39,12.65 22.47,12.16 L23.87,7.66 C23.95,7.6 23.97,7.55 23.97,7.5 Z M14,9 L14,5 L3,5 C1.9,5 1,5.9 1,7 L1,15 L3,15 C3,16.66 4.34,18 6,18 C7.66,18 9,16.66 9,15 L15,15 C15,16.66 16.34,18 18,18 C19.66,18 21,16.66 21,15 L23,15 L23,11 L14,11 L14,9 Z" fill="currentColor"/>
                  </svg>
                  <span>{{ bin.trailerLoads }} trailer load<span *ngIf="bin.trailerLoads > 1">s</span></span>
                </div>
              </div>

              <div class="bin-price">
                <span class="price">{{ bin.pricing.price }}</span>
                <span class="price-period">{{ bin.pricing.hireLength }}</span>
              </div>

              <div class="bin-actions">
                <a [routerLink]="['/bin', bin.id]" class="read-more-btn">Read More</a>
                <a [routerLink]="['/bin', bin.id]" [queryParams]="{address: deliveryAddress}" class="book-btn">Book Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bins-section green-section" *ngIf="greenBins.length > 0">
      <div class="container">
        <h2 class="section-title">Green Waste Bins</h2>
        <p class="section-desc">Use for garden trimmings, leaves, branches and other green waste</p>

        <div class="bins-grid">
          <div *ngFor="let bin of greenBins" class="bin-card">
            <div class="bin-image">
              <img [src]="bin.imagePath" alt="{{ bin.name }}">
              <div *ngIf="bin.isPopular" class="popular-badge">Most Popular</div>
            </div>
            <div class="bin-content">
              <h3 class="bin-title">{{ bin.size }} {{ bin.name }}</h3>
              <p class="bin-desc">{{ bin.shortDescription }}</p>

              <div class="bin-specs">
                <div class="spec-item">
                  <span class="spec-label">Dimensions:</span>
                  <span class="spec-value">{{ bin.dimensions.length }} x {{ bin.dimensions.width }} x {{ bin.dimensions.height }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Weight Limit:</span>
                  <span class="spec-value">{{ bin.weight.maxWeight }}{{ bin.weight.weightUnit }}</span>
                </div>
                <div class="spec-item trailer-loads">
                  <svg viewBox="0 0 24 24" class="trailer-icon">
                    <path d="M3,18 L7,18 L7,16 L3,16 L3,18 Z M20,18 L21,18 L21,16 L20,16 L20,18 Z M22,7.5 C22,7.22 21.78,7 21.5,7 L18,7 L18,13 L21.47,13 C21.97,13 22.39,12.65 22.47,12.16 L23.87,7.66 C23.95,7.6 23.97,7.55 23.97,7.5 Z M14,9 L14,5 L3,5 C1.9,5 1,5.9 1,7 L1,15 L3,15 C3,16.66 4.34,18 6,18 C7.66,18 9,16.66 9,15 L15,15 C15,16.66 16.34,18 18,18 C19.66,18 21,16.66 21,15 L23,15 L23,11 L14,11 L14,9 Z" fill="currentColor"/>
                  </svg>
                  <span>{{ bin.trailerLoads }} trailer load<span *ngIf="bin.trailerLoads > 1">s</span></span>
                </div>
              </div>

              <div class="bin-price">
                <span class="price">{{ bin.pricing.price }}</span>
                <span class="price-period">{{ bin.pricing.hireLength }}</span>
              </div>

              <div class="bin-actions">
                <a [routerLink]="['/bin', bin.id]" class="read-more-btn">Read More</a>
                <a [routerLink]="['/bin', bin.id]" [queryParams]="{address: deliveryAddress}" class="book-btn">Book Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="waste-types-section">
      <div class="container">
        <h2 class="section-title">Waste Types</h2>

        <div class="waste-types-grid">
          <div class="waste-type-card">
            <div class="waste-type-icon">
              <svg viewBox="0 0 24 24" class="waste-icon">
                <path d="M6,19c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V7H6V19z M8,9h8v10H8V9z M15.5,4l-1-1h-5l-1,1H5v2h14V4H15.5z" fill="currentColor"/>
              </svg>
            </div>
            <h3 class="waste-type-title">General Rubbish</h3>
            <p class="waste-type-desc">Our rubbish skip bins are for everyday rubbish, garden waste or construction site rubbish.</p>
          </div>

          <div class="waste-type-card">
            <div class="waste-type-icon">
              <svg viewBox="0 0 24 24" class="waste-icon">
                <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M13,7h4v4h-4V7z M13,13h4v4h-4V13z M7,7h4v4H7V7z M7,13h4v4H7V13z" fill="currentColor"/>
              </svg>
            </div>
            <h3 class="waste-type-title">Hardfill</h3>
            <p class="waste-type-desc">Our hardfill skip bins are for soil, concrete, bricks, rock and stone.</p>
          </div>

          <div class="waste-type-card">
            <div class="waste-type-icon">
              <svg viewBox="0 0 24 24" class="waste-icon">
                <path d="M12,22c4.97,0,9-4.03,9-9c0-4.39-3.38-8-7.99-8.31L13,2c0-0.55-0.45-1-1-1s-1,0.45-1,1v2.01c-1.43,0.1-2.77,0.5-4.01,1.09V4c0-0.55-0.45-1-1-1S5,3.45,5,4v1.54C3.18,6.98,2,9.27,2,12l0,2c0,4.97,4.03,9,9,9h1V22H12z M12,6c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6S8.69,6,12,6z" fill="currentColor"/>
              </svg>
            </div>
            <h3 class="waste-type-title">Garden Waste</h3>
            <p class="waste-type-desc">Garden waste like branches, leaves, garden cuttings or lawn clippings can be mixed with general rubbish or disposed of in our dedicated green waste bins.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Need help choosing the right bin?</h2>
          <p class="cta-desc">Call us and we can help you decide which bin size is right for your project.</p>
          <div class="cta-buttons">
            <a href="tel:02040936279" class="phone-btn">
              <svg viewBox="0 0 24 24" class="btn-icon">
                <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5C20.55,15.5 21,15.95 21,16.5V20C21,20.55 20.55,21 20,21C10.61,21 3,13.39 3,4C3,3.45 3.45,3 4,3H7.5C8.05,3 8.5,3.45 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" fill="currentColor"/>
              </svg>
              020 4093 6279
            </a>
            <a href="#quote" class="quote-btn">Get a Free Quote</a>
          </div>
        </div>
      </div>
    </section>

    <app-footer></app-footer>
  `,
  styles: [`
    /* Hero Section */
    .hero {
      background-color: #0b132b;
      padding: 4rem 0;
      margin-top: 70px;
      border-bottom: 1px solid rgba(90, 203, 210, 0.1);
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

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    h1 {
      font-size: 2.8rem;
      color: #fff;
      margin-bottom: 2rem;
      text-align: center;
      font-weight: 700;
    }

    .hero-intro {
      font-size: 1.4rem;
      color: #fff;
      text-align: center;
      margin-bottom: 2rem;
      font-weight: 500;
    }

    .hero-desc {
      max-width: 900px;
      margin: 0 auto 1.5rem;
      text-align: center;
      color: #a8b2d1;
      line-height: 1.6;
      font-size: 1.1rem;
    }

    .text-link {
      color: #5acbd2;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .text-link:hover {
      color: #fff;
      text-decoration: underline;
    }

    /* Bins Section */
    .bins-section {
      padding: 5rem 0;
      background-color: #0b132b;
    }

    .hardfill-section {
      background-color: #0a1127;
    }

    .green-section {
      background-color: #0c1733;
    }

    .section-title {
      font-size: 2.4rem;
      color: #fff;
      margin-bottom: 1rem;
      text-align: center;
      font-weight: 700;
    }

    .section-desc {
      font-size: 1.2rem;
      color: #a8b2d1;
      text-align: center;
      margin-bottom: 3rem;
      font-weight: 400;
    }

    .bins-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
      max-width: 1100px;
      margin: 0 auto;
    }

    .bin-card {
      background-color: #131d3b;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .bin-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
    }

    .bin-image {
      position: relative;
      width: 100%;
      height: 200px;
      overflow: hidden;
    }

    .bin-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .bin-card:hover .bin-image img {
      transform: scale(1.05);
    }

    .popular-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: #e61960;
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.3rem 0.8rem;
      border-radius: 4px;
      transform: rotate(5deg);
      z-index: 2;
    }

    .bin-content {
      padding: 1.5rem;
    }

    .bin-title {
      font-size: 1.5rem;
      color: #fff;
      margin-bottom: 0.8rem;
      font-weight: 600;
    }

    .bin-desc {
      color: #a8b2d1;
      margin-bottom: 1.5rem;
      line-height: 1.5;
      font-size: 0.95rem;
    }

    .bin-specs {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgba(90, 203, 210, 0.1);
    }

    .spec-item {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
    }

    .spec-label {
      color: #a8b2d1;
    }

    .spec-value {
      color: #fff;
      font-weight: 500;
    }

    .trailer-loads {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #5acbd2;
      justify-content: flex-end;
      font-weight: 500;
    }

    .trailer-icon {
      width: 20px;
      height: 20px;
      color: #5acbd2;
    }

    .bin-price {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 1.5rem;
    }

    .price {
      font-size: 1.8rem;
      font-weight: 700;
      color: #fff;
    }

    .price-period {
      color: #a8b2d1;
      font-size: 0.9rem;
    }

    .bin-actions {
      display: flex;
      gap: 1rem;
    }

    .read-more-btn, .book-btn {
      padding: 0.7rem 1rem;
      border-radius: 5px;
      text-decoration: none;
      font-weight: 600;
      flex: 1;
      text-align: center;
      transition: all 0.3s ease;
    }

    .read-more-btn {
      background-color: transparent;
      color: #5acbd2;
      border: 1px solid #5acbd2;
    }

    .read-more-btn:hover {
      background-color: rgba(90, 203, 210, 0.1);
      transform: translateY(-3px);
    }

    .book-btn {
      background-color: #5acbd2;
      color: #0b132b;
    }

    .book-btn:hover {
      background-color: #46b8bf;
      transform: translateY(-3px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }

    /* Waste Types Section */
    .waste-types-section {
      padding: 5rem 0;
      background-color: #0b132b;
    }

    .waste-types-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      max-width: 1100px;
      margin: 0 auto;
    }

    .waste-type-card {
      background-color: #131d3b;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .waste-type-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
      border-left: 3px solid #5acbd2;
    }

    .waste-type-icon {
      width: 60px;
      height: 60px;
      background-color: rgba(90, 203, 210, 0.1);
      border-radius: 50%;
      margin: 0 auto 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .waste-icon {
      width: 30px;
      height: 30px;
      color: #5acbd2;
    }

    .waste-type-title {
      font-size: 1.4rem;
      color: #fff;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .waste-type-desc {
      color: #a8b2d1;
      line-height: 1.6;
      font-size: 0.95rem;
    }

    /* CTA Section */
    .cta-section {
      padding: 5rem 0;
      background-color: #131d3b;
      color: white;
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
    }

    .cta-desc {
      font-size: 1.2rem;
      margin-bottom: 2.5rem;
      opacity: 0.9;
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
    }

    .phone-btn {
      background-color: #5acbd2;
      color: #0b132b;
    }

    .phone-btn:hover {
      background-color: #46b8bf;
      color: #0b132b;
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

    /* Responsive */
    @media (max-width: 992px) {
      .waste-types-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .bins-grid {
        grid-template-columns: repeat(2, 1fr);
        padding: 0 1rem;
      }
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2.2rem;
      }

      .hero-intro {
        font-size: 1.2rem;
      }

      .section-title {
        font-size: 2rem;
      }

      .bins-grid {
        grid-template-columns: 1fr;
      }

      .waste-types-grid {
        grid-template-columns: 1fr;
      }

      .cta-title {
        font-size: 1.8rem;
      }

      .cta-desc {
        font-size: 1rem;
      }

      .bin-price {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }

    @media (max-width: 480px) {
      .bin-actions {
        flex-direction: column;
      }
    }
  `]
})
export class AllBinsComponent implements OnInit {
  generalBins: Bin[] = [];
  hardfillBins: Bin[] = [];
  greenBins: Bin[] = [];
  deliveryAddress: string | null = null;

  constructor(
    private binService: BinService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get bins
    this.binService.getAllBins().subscribe(bins => {
      this.generalBins = bins.filter(bin => bin.category === BinCategory.GENERAL);
      this.hardfillBins = bins.filter(bin => bin.category === BinCategory.HARDFILL);
      this.greenBins = bins.filter(bin => bin.category === BinCategory.GREEN);
    });

    // Check for address parameter from the how-it-works page
    this.route.queryParams.subscribe(params => {
      if (params['address']) {
        this.deliveryAddress = params['address'];

        // Scroll to bins section after a short delay
        setTimeout(() => {
          document.querySelector('.bins-section')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 500);
      }
    });
  }
}
