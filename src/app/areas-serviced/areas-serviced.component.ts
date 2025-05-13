import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-areas-serviced',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent],
  template: `
    <section id="service-areas" class="service-areas-section">
      <div class="container">
        <div class="section-header">
          <h2 class="service-areas-title">SERVICE AREAS</h2>
          <div class="title-underline"></div>
          <p class="service-areas-intro">
            We proudly service Auckland and surrounding regions, including East Auckland, South Auckland, Central Auckland, West Auckland, North Shore, Rodney, Papakura, and Pukekohe. Our reliable bin delivery service is available throughout the greater Auckland area.
          </p>
        </div>

        <div class="service-areas-grid">
          <!-- Auckland Central -->
          <div class="service-area-card">
            <h3 class="area-title">AUCKLAND CENTRAL</h3>
            <p class="area-description">
              Auckland CBD, Blockhouse Bay, Epsom, Freemans Bay, Grafton, Grey Lynn, Mission Bay, Mount Albert, Mount Eden, Mount Roskill, Mount Wellington, Newmarket, Parnell, Penrose and much more suburbs are serviced by our trucks.
            </p>
          </div>

          <!-- West Auckland -->
          <div class="service-area-card">
            <h3 class="area-title">WEST AUCKLAND</h3>
            <p class="area-description">
              Glen Eden, Glendene, Henderson, Hobsonville, Kelston, Massey, New Lynn, Swanson, Westgate, West Harbour, Whenuapai, Western Heights, Te Atatu, Titirangi, Sunnyvale and much more suburbs are serviced by our trucks.
            </p>
          </div>

          <!-- North Shore -->
          <div class="service-area-card">
            <h3 class="area-title">NORTH SHORE</h3>
            <p class="area-description">
              Albany, Bayswater, Bayview, Beach Haven, Belmont, Birkdale, Birkenhead, Browns Bay, Campbells Bay, Castor Bay, Chatswood, Cheltenham, Milford, Devonport, Rosedale and much more suburbs are serviced by our trucks.
            </p>
          </div>

          <!-- Rodney -->
          <div class="service-area-card">
            <h3 class="area-title">RODNEY</h3>
            <p class="area-description">
              Arkles Bay, Army Bay, Dairy Flat, Gulf Harbour, Hatfields Beach, Huapai, Kumeu, Matakatia, Millwater, Orewa, Red Beach, Stanmore Bay, Stillwater, Tindalls Beach and much more suburbs are serviced by our trucks.
            </p>
          </div>

          <!-- South & Eastern Auckland -->
          <div class="service-area-card">
            <h3 class="area-title">SOUTH & EASTERN AUCKLAND</h3>
            <p class="area-description">
              Airport Oaks, Beachlands, Botany Downs, Bucklands Beach, Burswood, Chapel Downs, Clendon Park, Clover Park, Cockle Bay, Dannemora, East Tamaki, and much more suburbs are serviced by our trucks.
            </p>
          </div>

          <!-- Papakura & Pukekohe -->
          <div class="service-area-card">
            <h3 class="area-title">PAPAKURA & PUKEKOHE</h3>
            <p class="area-description">
              Alfriston, Ardmore, Conifer Grove, Drury, Longford Park, Manurewa East, Opaheke, Pahurehure, Papakura, Runciman, Red Hill, Rosehill, Takanini, Bombay and much more suburbs are serviced by our trucks.
            </p>
          </div>
        </div>

        <!-- Address Input Section -->
        <div class="address-input-section">
          <div class="address-heading">
            <h2>Get a quote to hire a good bin in your nearest area!</h2>
          </div>

          <div class="address-input-container">
            <input
              type="text"
              [(ngModel)]="deliveryAddress"
              class="address-input"
              placeholder="Enter bin delivery address"
              (keyup.enter)="checkAddress()"
            >
            <button class="next-button" (click)="checkAddress()">NEXT</button>
          </div>
        </div>
      </div>
    </section>


    <section class="how-it-works-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Our Process</h2>
          <div class="title-underline"></div>
        </div>

        <div class="process-cards">
          <div class="process-card">
            <div class="icon-wrapper">
              <span class="icon">🕒</span>
            </div>
            <h3>Delivery Hours</h3>
            <p>Monday - Friday<br>6:30am - 5:00pm<br>Saturday<br>6:30am - 12:00pm</p>
          </div>

          <div class="process-card">
            <div class="icon-wrapper">
              <span class="icon">📞</span>
            </div>
            <h3>Book Anytime</h3>
            <p>24/7 online booking<br>Phone support available</p>
          </div>

          <div class="process-card">
            <div class="icon-wrapper">
              <span class="icon">📅</span>
            </div>
            <h3>Hire Period</h3>
            <p>Standard: Up to 4 days<br>Extended periods available</p>
          </div>

          <div class="process-card">
            <div class="icon-wrapper">
              <span class="icon">🔍</span>
            </div>
            <h3>Expert Guidance</h3>
            <p>Our team will help you choose the right bin for your needs</p>
          </div>

          <div class="process-card">
            <div class="icon-wrapper">
              <span class="icon">💰</span>
            </div>
            <h3>WINZ Quotes</h3>
            <p>Call us for special WINZ quotes and assistance</p>
          </div>
        </div>
      </div>
    </section>



    <section id="contact-form" class="contact-form-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Get In Touch</h2>
          <div class="title-underline"></div>
          <p class="section-intro">Have questions? Send us a message and we'll get back to you as soon as possible.</p>
        </div>

        <div class="contact-container">
          <div class="contact-info-box">
            <h3>Contact Information</h3>
            <ul class="contact-details">
              <li>
                <i class="contact-icon">📱</i>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:02040936279">020 4093 6279</a>
                </div>
              </li>
              <li>
                <i class="contact-icon">📧</i>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:gooddayremovals&#64;hotmail.com">gooddayremovals&#64;hotmail.com</a>
                </div>
              </li>
              <li>
                <i class="contact-icon">📍</i>
                <div>
                  <h4>Location</h4>
                  <p>East Auckland, NZ</p>
                </div>
              </li>
              <li>
                <i class="contact-icon">🕒</i>
                <div>
                  <h4>Hours</h4>
                  <p>Monday - Friday: 6:30am - 5:00pm<br/>Saturday: 6:30am - 12:00pm</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="contact-form-box">
            <form class="contact-form">
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
                  <input type="tel" id="phone" placeholder="Your Phone Number">
                </div>
                <div class="form-group">
                  <label for="subject">Subject</label>
                  <select id="subject" required>
                    <option value="" disabled selected>Select a Subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="quote">Request a Quote</option>
                    <option value="service">Service Question</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div class="form-group full-width">
                  <label for="message">Message</label>
                  <textarea id="message" rows="5" placeholder="Your Message" required></textarea>
                </div>
              </div>
              <button type="submit" class="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <app-footer></app-footer>
  `,
  styles: [
    `
      /* Page Header */
      .page-header {
        background-color: #0b132b;
        color: #fff;
        padding: 6rem 0 2rem;
        text-align: center;
        margin-bottom: 2rem;
      }

      .page-header h1 {
        font-size: 2.8rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }

      .title-underline {
        height: 3px;
        width: 80px;
        background: #e61960;
        margin: 0 auto;
      }

      /* How It Works Section */
      .how-it-works-section {
        padding: 5rem 0;
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

      .process-cards {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1.5rem;
      }

      .process-card {
        background-color: #131d3b;
        border-radius: 10px;
        padding: 2rem 1rem;
        text-align: center;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .process-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        border-left: 3px solid #5acbd2;
      }

      .icon-wrapper {
        width: 70px;
        height: 70px;
        background-color: rgba(90, 203, 210, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
      }

      .icon {
        font-size: 2rem;
      }

      .process-card h3 {
        color: #fff;
        font-size: 1.2rem;
        margin-bottom: 1rem;
        font-weight: 600;
      }

      .process-card p {
        color: #a8b2d1;
        font-size: 0.9rem;
        line-height: 1.6;
      }

      /* CTA Banner */
      .cta-banner {
        background-color: #0b132b;
        color: #fff;
        padding: 3rem 0;
        text-align: center;
      }

      .cta-banner h2 {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        font-weight: 600;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
      }

      .cta-button {
        display: inline-block;
        background-color: #e61960;
        color: #fff;
        border: none;
        padding: 0.8rem 2rem;
        border-radius: 4px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
      }

      .cta-button:hover {
        background-color: #d01555;
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }

      /* Service Areas Section */
      .service-areas-section {
        background-color: #0b132b;
        padding: 5rem 0;
        margin-top: 2rem;
      }

      .service-areas-title {
        font-size: 2.5rem;
        color: #fff;
        margin-bottom: 1rem;
        font-weight: 700;
        text-align: center;
      }

      .service-areas-intro {
        color: #a8b2d1;
        font-size: 1.1rem;
        max-width: 800px;
        margin: 1.5rem auto 2.5rem;
        text-align: center;
        line-height: 1.6;
      }

      .service-areas-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        margin-bottom: 2rem;
      }

      .service-area-card {
        background-color: #131d3b;
        border: 1px solid rgba(90, 203, 210, 0.2);
        border-radius: 8px;
        padding: 2rem;
        color: #fff;
        text-align: center;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .service-area-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        border-color: #5acbd2;
      }

      .area-title {
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 1.2rem;
        color: #5acbd2;
      }

      .area-description {
        color: #a8b2d1;
        font-size: 0.95rem;
        line-height: 1.6;
      }

      /* Address Input Section */
      .address-input-section {
        background-color: #131d3b;
        padding: 2.5rem 2rem;
        border-radius: 8px;
        margin-top: 2rem;
        border: 1px solid rgba(90, 203, 210, 0.2);
        text-align: center;
      }

      .address-heading {
        text-align: center;
        margin-bottom: 1.8rem;
      }

      .address-heading h2 {
        font-size: 1.8rem;
        font-weight: 600;
        color: #fff;
        max-width: 700px;
        margin: 0 auto;
      }

      .address-input-container {
        display: flex;
        max-width: 700px;
        margin: 0 auto;
        justify-content: center;
      }

      .address-input {
        flex: 1;
        padding: 1rem 1.5rem;
        border: 1px solid rgba(90, 203, 210, 0.2);
        border-radius: 4px;
        font-size: 1rem;
        background-color: rgba(255, 255, 255, 0.05);
        color: #fff;
        max-width: 500px;
      }

      .address-input:focus {
        outline: none;
        border-color: #5acbd2;
        box-shadow: 0 0 0 3px rgba(90, 203, 210, 0.1);
      }

      .next-button {
        background-color: #5acbd2;
        color: #0b132b;
        border: none;
        border-radius: 4px;
        padding: 0 1.8rem;
        margin-left: 0.8rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        height: 48px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .next-button:hover {
        background-color: #46b8bf;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
      }

      /* Contact Form Section */
      .contact-form-section {
        padding: 5rem 0;
        background-color: #0b132b;
      }

      .section-intro {
        font-size: 1.1rem;
        max-width: 700px;
        margin: 0 auto 3rem;
        color: #a8b2d1;
        text-align: center;
      }

      .contact-container {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 2rem;
      }

      .contact-info-box {
        background-color: #131d3b;
        padding: 2.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }

      .contact-info-box h3 {
        color: #fff;
        font-size: 1.4rem;
        margin-bottom: 1.5rem;
        font-weight: 600;
      }

      .contact-details {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .contact-details li {
        display: flex;
        align-items: flex-start;
        margin-bottom: 1.5rem;
      }

      .contact-icon {
        font-size: 1.5rem;
        margin-right: 1rem;
        color: #5acbd2;
      }

      .contact-details h4 {
        color: #fff;
        font-size: 1rem;
        margin: 0 0 0.5rem;
        font-weight: 600;
      }

      .contact-details p {
        margin: 0;
        color: #a8b2d1;
        line-height: 1.5;
      }

      .contact-details a {
        color: #5acbd2;
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .contact-details a:hover {
        color: #e61960;
      }

      .contact-form-box {
        background-color: #131d3b;
        padding: 2.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
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

      .contact-form label {
        display: block;
        margin-bottom: 0.5rem;
        color: #fff;
        font-size: 0.9rem;
        font-weight: 500;
      }

      .contact-form input,
      .contact-form select,
      .contact-form textarea {
        width: 100%;
        padding: 0.8rem 1rem;
        border: 1px solid rgba(90, 203, 210, 0.2);
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.05);
        color: #fff;
        font-size: 1rem;
        transition: all 0.3s ease;
      }

      .contact-form input::placeholder,
      .contact-form textarea::placeholder {
        color: rgba(168, 178, 209, 0.6);
      }

      .contact-form input:focus,
      .contact-form select:focus,
      .contact-form textarea:focus {
        outline: none;
        border-color: #5acbd2;
        box-shadow: 0 0 0 3px rgba(90, 203, 210, 0.1);
        background-color: rgba(255, 255, 255, 0.1);
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
      }

      .submit-btn:hover {
        background-color: #d01555;
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }

      /* Responsive Design */
      @media (max-width: 1100px) {
        .process-cards {
          grid-template-columns: repeat(3, 1fr);
        }

        .service-areas-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 768px) {
        .process-cards {
          grid-template-columns: repeat(2, 1fr);
        }

        .service-areas-grid {
          grid-template-columns: repeat(1, 1fr);
        }

        .contact-container {
          grid-template-columns: 1fr;
        }

        .page-header h1 {
          font-size: 2.2rem;
        }

        .address-input-container {
          flex-direction: column;
          justify-content: center;
        }

        .next-button {
          margin-left: 0;
          margin-top: 1rem;
          padding: 1rem;
          height: 48px;
        }
      }

      @media (max-width: 576px) {
        .how-it-works-section {
          padding: 3rem 0;
        }

        .process-cards {
          grid-template-columns: 1fr;
        }

        .section-title {
          font-size: 2rem;
        }

        .cta-banner h2 {
          font-size: 1.5rem;
        }

        .form-grid {
          grid-template-columns: 1fr;
        }

        .full-width {
          grid-column: span 1;
        }
      }
    `
  ]
})
export class AreasServicedComponent {
  deliveryAddress: string = '';

  constructor(private router: Router) {}

  checkAddress() {
    if (this.deliveryAddress && this.deliveryAddress.trim() !== '') {
      // In a real app, you might want to validate the address first
      // For now, we'll just redirect to the services page
      this.router.navigate(['/services'], {
        queryParams: {
          address: this.deliveryAddress
        }
      });
    }
  }
}
