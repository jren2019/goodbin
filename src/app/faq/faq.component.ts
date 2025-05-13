import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

interface FaqCategory {
  name: string;
  items: FaqItem[];
  isExpanded: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FooterComponent, RouterModule],
  template: `
    <section class="hero">
      <div class="container">
        <h1>Frequently Asked Questions</h1>
        <p class="hero-intro">
          Many customers don't deal with Waste Management services very often, so it's not uncommon for them to have questions about the industry, what can and cannot be placed into a skip bin, and how costs can be minimized. We've taken some time to compile a list of frequently asked questions that might answer some of the questions that you might have, but if not, then we'd encourage you to call one of our friendly and knowledgeable team members.
        </p>
      </div>
    </section>

    <section class="faq-section">
      <div class="container">
        <div class="faq-container">
          <div class="faq-category" *ngFor="let category of faqCategories; let catIndex = index">
            <div class="category-header" (click)="toggleCategory(catIndex)">
              <h2>{{ category.name }}</h2>
              <div class="toggle-icon" [class.active]="category.isExpanded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12" class="horizontal"></line>
                </svg>
              </div>
            </div>

            <div class="category-items" [class.expanded]="category.isExpanded">
              <div class="faq-item" *ngFor="let item of category.items; let i = index" [class.active]="item.isOpen">
                <div class="faq-question" (click)="toggleFaq(catIndex, i)">
                  <h3>{{ item.question }}</h3>
                  <div class="toggle-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12" class="horizontal"></line>
                    </svg>
                  </div>
                </div>
                <div class="faq-answer">
                  <div class="answer-content" [innerHTML]="item.answer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Need another question answered?</h2>
          <p class="cta-desc">We're here to help you 24/7</p>
          <div class="cta-buttons">
            <a href="tel:02040936279" class="phone-btn">
              <svg viewBox="0 0 24 24" class="btn-icon">
                <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5C20.55,15.5 21,15.95 21,16.5V20C21,20.55 20.55,21 20,21C10.61,21 3,13.39 3,4C3,3.45 3.45,3 4,3H7.5C8.05,3 8.5,3.45 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" fill="currentColor"/>
              </svg>
              020 4093 6279
            </a>
            <a routerLink="/contact" class="contact-btn">Contact Us</a>
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
      font-size: 1.1rem;
      color: #a8b2d1;
      text-align: center;
      margin-bottom: 1rem;
      font-weight: 400;
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.6;
    }

    /* FAQ Section */
    .faq-section {
      background-color: #0b132b;
      padding: 4rem 0 6rem;
    }

    .faq-container {
      max-width: 900px;
      margin: 0 auto;
    }

    .faq-category {
      margin-bottom: 2.5rem;
    }

    .category-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #131d3b;
      padding: 1.5rem 2rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      cursor: pointer;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
      border-left: 3px solid #e61960;
    }

    .category-header:hover {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }

    .category-header h2 {
      font-size: 1.5rem;
      color: #fff;
      margin: 0;
      font-weight: 600;
    }

    .category-items {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.5s ease;
    }

    .category-items.expanded {
      max-height: 5000px;
    }

    .faq-item {
      background-color: #131d3b;
      border-radius: 10px;
      margin-bottom: 1rem;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
    }

    .faq-item:hover {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }

    .faq-item.active {
      border-left: 3px solid #5acbd2;
    }

    .faq-question {
      padding: 1.5rem 2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }

    .faq-question h3 {
      margin: 0;
      font-size: 1.15rem;
      font-weight: 600;
      color: #fff;
      flex: 1;
      padding-right: 2rem;
    }

    .toggle-icon {
      width: 24px;
      height: 24px;
      color: #5acbd2;
      transition: transform 0.3s ease;
    }

    .toggle-icon.active, .active .toggle-icon {
      transform: rotate(45deg);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.5s ease;
    }

    .active .faq-answer {
      max-height: 1000px;
    }

    .answer-content {
      padding: 0 2rem 1.5rem;
      color: #a8b2d1;
      line-height: 1.6;
    }

    .answer-content p {
      margin-bottom: 1rem;
    }

    .answer-content ul {
      margin-bottom: 1rem;
      margin-left: 1.5rem;
    }

    .answer-content li {
      margin-bottom: 0.5rem;
    }

    .answer-content a {
      color: #5acbd2;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .answer-content a:hover {
      color: #fff;
      text-decoration: underline;
    }

    /* CTA Section */
    .cta-section {
      background-color: #131d3b;
      padding: 5rem 0;
      color: white;
      border-top: 1px solid rgba(90, 203, 210, 0.1);
    }

    .cta-content {
      text-align: center;
      max-width: 700px;
      margin: 0 auto;
    }

    .cta-title {
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 1rem;
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

    .phone-btn, .contact-btn {
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
      transform: translateY(-3px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .contact-btn {
      background-color: #e61960;
      color: white;
    }

    .contact-btn:hover {
      background-color: #d01555;
      transform: translateY(-3px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .btn-icon {
      width: 20px;
      height: 20px;
      margin-right: 0.5rem;
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      h1 {
        font-size: 2.2rem;
      }

      .category-header h2 {
        font-size: 1.3rem;
      }

      .cta-title {
        font-size: 1.8rem;
      }

      .faq-question h3 {
        font-size: 1.1rem;
      }
    }
  `]
})
export class FaqComponent {
  faqCategories: FaqCategory[] = [
    {
      name: 'Services, Bins and Waste Types',
      isExpanded: true,
      items: [
        {
          question: 'What types of waste can you remove for me?',
          answer: `
            <p>Waste is categorized into four broad categories by transfer stations. These are:</p>
            <ul>
              <li>General Waste</li>
              <li>Green Waste</li>
              <li>Hardfill Waste</li>
              <li>Hazardous Waste</li>
            </ul>
            <p>Accordingly, we provide specific services for each of these categories.</p>
          `,
          isOpen: false
        },
        {
          question: 'How long can I keep a skip for?',
          answer: `
            <p>We offer two basic services. The first being a 24 hour service, and the second being a 4 day service. In the case of the 4 day service, we do offer the ability to extend the period up to 7 days for an additional daily charge.</p>
          `,
          isOpen: false
        },
        {
          question: 'How high can I fill the skip bin?',
          answer: `
            <p>Waste must be below or level with the top of the bin. Any waste protruding above the top of the bin will be removed and left behind.</p>
          `,
          isOpen: false
        },
        {
          question: 'Why are there weight limits on bins?',
          answer: `
            <p>We have weight limits on the bins as we get charged by the landfills by the weight of the bin. The weight limits for each size are on the Our Bins page. You are better to go up a size bin if you are not sure the weight allowance is enough for your rubbish. If your bin is over the weight allowance for the size bin you have hired, you will receive an invoice for this charge. We appreciate payment within 7 days.</p>
          `,
          isOpen: false
        },
        {
          question: 'Can you deliver my skip bin at a particular time?',
          answer: `
            <p>We cannot promise delivery times, but we will always phone before we come. If you have particular time needs, please contact us, and we will do our best to accommodate you where possible.</p>
          `,
          isOpen: false
        },
        {
          question: 'How wide does my drive need to be?',
          answer: `
            <p>The bigger the skip bin, the bigger the truck required to deliver and collect the skip bin. For that reason, the following minimums apply by bin size:</p>
            <ul>
              <li>for 2m³, 3m³ and 4.5m³ bins, we require your drive to be at least 2.3m wide</li>
              <li>for 6m³-12m³ bins, we require your drive to be at least 2.5m wide</li>
              <li>for 15m³ bins, we require your drive to be at least 2.7m wide</li>
              <li>and for all hardfill bins, we require your drive to be at least 2.7m wide</li>
            </ul>
          `,
          isOpen: false
        },
        {
          question: 'Where will the skip bin be placed on my property?',
          answer: `
            <p>Ideally, the bin would be placed within your boundary; however, if this is not possible, then placing the bin on the verge is allowable for short periods of time. Bins cannot be placed on the road or block footpaths. Some areas may require that you acquire a permit from Auckland council.</p>
          `,
          isOpen: false
        },
        {
          question: 'What can go into a General Waste skip bin?',
          answer: `
            <p>Our General Waste skip bins can contain most household, green and building waste.</p>
          `,
          isOpen: false
        },
        {
          question: 'What CANNOT go into a General Waste skip bin?',
          answer: `
            <p>Our General Waste skip bins CANNOT contain concrete, soil, clay, bricks, liquids (paint, oils etc.), tyres or ASBESTOS FIBROLITE.</p>
            <p>Additionally, there are extremely large fines from the Transfer Station for dumping any fibrolite with ASBESTOS. The fines start at $2000 and go up depending on weight. These costs will be passed on to the customer who has hired and placed ASBESTOS into any of our bins. If you are not sure if the fibrolite has ASBESTOS, please get it tested. Better to be safe than sorry.</p>
          `,
          isOpen: false
        },
        {
          question: 'What can go into a Green Waste skip bin?',
          answer: `
            <p>Our Green Waste skip bins can contain green waste.</p>
          `,
          isOpen: false
        },
        {
          question: 'What CANNOT go into a Green Waste skip bin?',
          answer: `
            <p>Our Green Waste skip bins CANNOT contain concrete, soil, clay, bricks, liquids (paint, oils etc.), tyres or ASBESTOS FIBROLITE.</p>
            <p>Additionally, there are extremely large fines from the Transfer Station for dumping any fibrolite with ASBESTOS. The fines start at $2000 and go up depending on weight. These costs will be passed on to the customer who has hired and placed ASBESTOS into any of our bins. If you are not sure if the fibrolite has ASBESTOS, please get it tested. Better to be safe than sorry.</p>
          `,
          isOpen: false
        },
        {
          question: 'What can go into a Hardfill skip bin?',
          answer: `
            <p>Our Hardfill Waste skip bins CAN ONLY CONTAIN concrete, soil, clay, bricks, rocks and tiles.</p>
            <p>Please note: Placing any amount of any other rubbish into a hardfill skip bin requires that it be processed as a General Waste bin which must be disposed of at a Transfer Station and which could incur very costly weight-based charges.</p>
          `,
          isOpen: false
        },
        {
          question: 'What CANNOT go into a Hardfill skip bin?',
          answer: `
            <p>Anything other than concrete, soil, clay, bricks, rocks and tiles.</p>
          `,
          isOpen: false
        },
        {
          question: 'What can go into a Hazardous Waste skip bin?',
          answer: `
            <p>ASBESTOS FIBROLITE only. Hazardous Waste bins are only available by prior arrangement.</p>
          `,
          isOpen: false
        },
        {
          question: 'What CANNOT go into a Hazardous Waste skip bin?',
          answer: `
            <p>Anything other than ASBESTOS FIBROLITE.</p>
          `,
          isOpen: false
        }
      ]
    },
    {
      name: 'Costing, Billing and Terms of Service',
      isExpanded: false,
      items: [
        {
          question: 'How much does it cost to hire a skip bin?',
          answer: `
            <p>Our bin prices are all available on our <a routerLink="/services">Our Bins</a> page.</p>
          `,
          isOpen: false
        },
        {
          question: 'What forms of payment do you accept and who do I pay?',
          answer: `
            <p>We process Visa, Mastercard, Direct Credit or cash to the driver by arrangement. Bins must be paid for prior to delivery.</p>
          `,
          isOpen: false
        },
        {
          question: 'Why do bins have weight limits?',
          answer: `
            <p>When we dispose of waste at Transfer Stations, we are charged by them for the weight of the waste in the skip bin. To simplify costing for you, our customer, we have included a weight allowance for each of our bin sizes. Where the weight of your waste exceeds that allowance for the bin you hired, you will be invoiced for the overweight charges. In most cases, if you are unsure if your waste will exceed the weight allowance, it is better to go up a bin size rather than pay the overweight charges.</p>
          `,
          isOpen: false
        },
        {
          question: 'Why are overweight charges not charged upfront?',
          answer: `
            <p>It is impossible for us to know the weight of your waste until we deposit it at the Transfer Station; therefore, we cannot tell you what the overweight charges will be upfront.</p>
          `,
          isOpen: false
        },
        {
          question: 'When will I be charged for overweight charges?',
          answer: `
            <p>We process all overweight charges as soon as practicable. This is generally within 7-10 days.</p>
          `,
          isOpen: false
        },
        {
          question: 'How are overweight charges calculated?',
          answer: `
            <p>Overweight charges are charged at $205.00 (including GST) per ton for the weight of our waste above the weight allowance for the bin you hired.</p>
          `,
          isOpen: false
        }
      ]
    },
    {
      name: 'General Questions',
      isExpanded: false,
      items: [
        {
          question: 'What days of the week do you operate?',
          answer: `
            <p>We operate Monday to Saturday. We do not operate on Sundays or Public Holidays.</p>
          `,
          isOpen: false
        },
        {
          question: 'How long have you been in business, and how big is your team?',
          answer: `
            <p>We've been proudly serving the Auckland market for 35 years and currently have a team of 12 team members ready to serve you.</p>
          `,
          isOpen: false
        },
        {
          question: 'What areas do you service?',
          answer: `
            <p>We service the following areas across Auckland. Please use the instant quote function to get a quote to hire a skip bin in your suburb.</p>
            <p>Auckland City, West Auckland, East Auckland, South Auckland, North Shore, Whangaparaoa, Rodney, Warkworth</p>
          `,
          isOpen: false
        },
        {
          question: 'Do I need to be there when the bin is delivered?',
          answer: `
            <p>No - if you provide delivery instructions when ordering the bin then these will be passed onto the driver for delivery.</p>
          `,
          isOpen: false
        },
        {
          question: 'Can I move the bin?',
          answer: `
            <p>No - the bin is placed where the truck is able to, then the truck will pick the bin up again.</p>
          `,
          isOpen: false
        },
        {
          question: 'Do you organise WINZ quotes?',
          answer: `
            <p>Yes we do, please call us and we can organise this for you.</p>
          `,
          isOpen: false
        },
        {
          question: 'How much notice do I need to give you when booking a bin?',
          answer: `
            <p>This depends on availability - you would be best to give as much notice as possible, usually 3-4 days.</p>
          `,
          isOpen: false
        }
      ]
    }
  ];

  toggleFaq(categoryIndex: number, itemIndex: number): void {
    this.faqCategories[categoryIndex].items[itemIndex].isOpen = !this.faqCategories[categoryIndex].items[itemIndex].isOpen;
  }

  toggleCategory(index: number): void {
    this.faqCategories[index].isExpanded = !this.faqCategories[index].isExpanded;
  }
}
