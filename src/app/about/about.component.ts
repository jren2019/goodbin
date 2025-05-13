import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { TestimonialsComponent } from '../testimonials/testimonials.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FooterComponent, CommonModule, TestimonialsComponent],
  template: `
    <section class="about-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">About Us</h2>
          <div class="title-underline"></div>
        </div>

        <div class="about-content">
          <div class="about-text">
            <p class="lead">
              Good Bins Removals is a family-owned rubbish bin hire company in Auckland. Founded in 2016 as a furniture removals company, we've evolved to specialize in skip bin hire, delivering rubbish and hardfill bins across Auckland.
            </p>
            <p>
              Our team consists of highly skilled professionals with a passion for excellence and commitment to customer satisfaction. We take pride in providing reliable, efficient, and eco-friendly waste management solutions.
            </p>
          </div>

          <div class="about-image">
            <img src="https://ext.same-assets.com/3591989571/2853328101.jpeg" alt="Good Bins Team" class="rounded-image">
          </div>
        </div>

        <div class="mission-section">
          <div class="mission-card">
            <h3>Our Mission</h3>
            <p>
              Our mission is to deliver high-quality services that meet the needs and exceed the expectations of our clients. We strive to make waste management hassle-free, affordable, and environmentally responsible.
            </p>
          </div>
        </div>

        <div class="recycling-section">
          <h3 class="recycling-title">Our Commitment to Sustainability</h3>
          <div class="title-underline"></div>
          <p class="recycling-intro">
            At Good Bins, we're committed to environmentally responsible waste management. We continuously work to reduce landfill waste and promote recycling practices.
          </p>

          <div class="recycling-process">
            <div class="process-step">
              <div class="step-icon">
                <i class="fas">🔍</i>
              </div>
              <h4>Waste Assessment</h4>
              <p>
                We carefully assess all waste to identify recyclable materials, ensuring they're directed to appropriate recycling facilities.
              </p>
            </div>

            <div class="process-step">
              <div class="step-icon">
                <i class="fas">🔄</i>
              </div>
              <h4>Sorting & Processing</h4>
              <p>
                Our sorting process separates recyclables from general waste, maximizing the amount of material that can be reused or recycled.
              </p>
            </div>

            <div class="process-step">
              <div class="step-icon">
                <i class="fas">📊</i>
              </div>
              <h4>Waste Minimization</h4>
              <p>
                We're constantly developing new strategies to reduce the volume of waste that ends up in landfills, preserving our environment for future generations.
              </p>
            </div>
          </div>
        </div>

        <div class="services-section">
          <h3 class="services-title">Our Services</h3>
          <div class="title-underline"></div>

          <div class="services-grid">
            <div class="service-card">
              <div class="service-icon">
                <i class="fas">🚚</i>
              </div>
              <h4>Skip Bin Hire</h4>
              <p>
                We offer a range of skip bin sizes for residential and commercial use, with options for general waste, hardfill, and mixed materials.
              </p>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="fas">📦</i>
              </div>
              <h4>Waste Collection</h4>
              <p>
                Our reliable waste collection service ensures prompt pickup at your convenience, with options for scheduled or one-time collections.
              </p>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="fas">🏗️</i>
              </div>
              <h4>Construction Waste</h4>
              <p>
                Specialized bins for construction and demolition waste, with proper disposal methods that comply with regulatory requirements.
              </p>
            </div>
          </div>
        </div>

        <!-- Using the standalone testimonials component for consistency with home page -->
        <app-testimonials></app-testimonials>

        <div class="cta-box">
          <h4>Ready to get started?</h4>
          <p>Contact us today to find the perfect bin solution for your needs.</p>
          <a href="#quote" class="cta-button">Get a Free Quote</a>
        </div>
      </div>
    </section>
    <app-footer></app-footer>
  `,
  styles: [`
    .about-section {
      padding: 6rem 0;
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
      background-color: #e61960;
      margin: 0 auto 1.5rem;
    }

    .about-content {
      display: flex;
      gap: 2rem;
      margin-bottom: 4rem;
      align-items: center;
    }

    .about-text {
      flex: 1;
    }

    .lead {
      font-size: 1.2rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
      color: #fff;
    }

    p {
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .about-image {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    .rounded-image {
      width: 100%;
      max-width: 400px;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .mission-section {
      margin-bottom: 4rem;
    }

    .mission-card {
      background-color: #131d3b;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .mission-card h3 {
      color: #fff;
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    .recycling-section {
      margin-bottom: 4rem;
    }

    .recycling-title, .services-title {
      font-size: 2rem;
      color: #fff;
      margin-bottom: 1rem;
      text-align: center;
      font-weight: 600;
    }

    .recycling-intro {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 3rem;
    }

    .recycling-process {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .process-step {
      background-color: #131d3b;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .process-step:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }

    .step-icon {
      width: 60px;
      height: 60px;
      background-color: rgba(90, 203, 210, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
    }

    .step-icon i {
      font-size: 1.5rem;
      color: #5acbd2;
    }

    .process-step h4 {
      color: #fff;
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }

    .services-section {
      margin-bottom: 4rem;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .service-card {
      background-color: #131d3b;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }

    .service-icon {
      width: 60px;
      height: 60px;
      background-color: rgba(90, 203, 210, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
    }

    .service-icon i {
      font-size: 1.5rem;
      color: #5acbd2;
    }

    .service-card h4 {
      color: #fff;
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }

    /* Testimonials provided by TestimonialsComponent */

    .cta-box {
      background-color: #131d3b;
      border-radius: 8px;
      padding: 3rem;
      text-align: center;
      margin-top: 4rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    .cta-box h4 {
      font-size: 2rem;
      color: #fff;
      margin-bottom: 1rem;
    }

    .cta-box p {
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-button {
      display: inline-block;
      background-color: #e61960;
      color: #fff;
      padding: 0.8rem 2rem;
      border-radius: 5px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .cta-button:hover {
      background-color: #d01555;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 992px) {
      .about-content {
        flex-direction: column;
      }

      .recycling-process, .services-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .section-title {
        font-size: 2rem;
      }

      .recycling-title, .services-title {
        font-size: 1.8rem;
      }

      .recycling-process, .services-grid {
        grid-template-columns: 1fr;
      }

      .cta-box {
        padding: 2rem;
      }
    }
  `]
})
export class AboutComponent {
  // Testimonials now handled by the TestimonialsComponent
}
