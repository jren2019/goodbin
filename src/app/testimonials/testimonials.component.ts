import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  name: string;
  review: string;
  rating: number;
  title: string;
  avatarColor?: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      name: 'David Wilson',
      review: 'I had a big yard cleanup after a storm and needed a bin urgently. Good Bins delivered within hours! The service was excellent - they placed the bin exactly where I needed and pickup was on time. No hidden fees and very competitive prices. Will be my go-to for all future waste removal projects.',
      rating: 5,
      title: 'Client'
    },
    {
      name: 'Sarah Johnson',
      review: 'Used Good Bins for our kitchen renovation and they were fantastic. The staff were incredibly helpful on the phone and helped me pick the right bin size. Delivery was exactly on schedule and the driver was so careful with our new driveway. Super impressed with the whole service!',
      rating: 5,
      title: 'Client'
    },
    {
      name: 'Michael Thompson',
      review: 'After trying multiple waste companies in Auckland, I can confidently say Good Bins is the best! Their online booking system is super easy to use. The bin was spotless when delivered and the staff were professional and friendly. They made my garden cleanup project so much easier.',
      rating: 5,
      title: 'Client'
    }
  ];

  avatarColors = [
    '#4285F4', // Google blue
    '#34A853', // Google green
    '#FBBC05', // Google yellow
    '#EA4335', // Google red
    '#5acbd2', // Brand teal
    '#5f6368'  // Google grey
  ];

  constructor() {
    // Assign random colors to testimonials
    this.testimonials.forEach(testimonial => {
      const randomIndex = Math.floor(Math.random() * this.avatarColors.length);
      testimonial.avatarColor = this.avatarColors[randomIndex];
    });
  }
}
