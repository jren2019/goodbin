import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BlogService } from '../../shared/services/blog.service';
import { BlogPost, BlogCategory } from '../../shared/models/blog.model';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { NewsletterSignupComponent } from '../../shared/components/newsletter-signup/newsletter-signup.component';
import { BlogCtaComponent } from '../../shared/components/blog-cta/blog-cta.component';
import { NewsletterModalComponent } from '../../shared/components/newsletter-modal/newsletter-modal.component';
import { NewsletterButtonComponent } from '../../shared/components/newsletter-button/newsletter-button.component';
import { NewsletterService } from '../../shared/services/newsletter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    NewsletterSignupComponent,
    BlogCtaComponent,
    NewsletterModalComponent,
    NewsletterButtonComponent
  ],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit, OnDestroy {
  blogPosts: BlogPost[] = [];
  categories: BlogCategory[] = [];
  popularPosts: BlogPost[] = [];
  selectedCategory: string | null = null;
  showNewsletterModal = false;
  private modalSubscription: Subscription | undefined;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private newsletterService: NewsletterService
  ) { }

  ngOnInit(): void {
    this.loadBlogPosts();
    this.loadCategories();
    this.loadPopularPosts();

    // Initialize exit intent detection after a short delay
    // to allow the user to read some content first
    setTimeout(() => {
      this.newsletterService.initExitIntentDetection();
    }, 15000); // 15 seconds

    // Subscribe to changes in modal visibility
    this.modalSubscription = this.newsletterService.showModal$.subscribe(
      show => this.showNewsletterModal = show
    );
  }

  ngOnDestroy(): void {
    // Clean up subscription
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }

  closeNewsletterModal(): void {
    this.newsletterService.closeModal();
  }

  loadBlogPosts(): void {
    this.blogService.getAllPosts().subscribe(posts => {
      this.blogPosts = posts;
    });
  }

  loadCategories(): void {
    this.blogService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadPopularPosts(): void {
    this.blogService.getPopularPosts().subscribe(posts => {
      this.popularPosts = posts;
    });
  }

  filterByCategory(category: string | null): void {
    this.selectedCategory = category;

    if (category === null) {
      // If no category selected, show all posts
      this.loadBlogPosts();
    } else {
      // Filter posts by the selected category
      this.blogService.getAllPosts().subscribe(posts => {
        this.blogPosts = posts.filter(post =>
          post.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
        );
      });
    }
  }

  navigateToPost(slug: string): void {
    this.router.navigate(['/blog', slug]);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
