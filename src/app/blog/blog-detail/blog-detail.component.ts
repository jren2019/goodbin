import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogService } from '../../shared/services/blog.service';
import { BlogPost, BlogCategory } from '../../shared/models/blog.model';
import { switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { NewsletterSignupComponent } from '../../shared/components/newsletter-signup/newsletter-signup.component';
import { BlogCtaComponent } from '../../shared/components/blog-cta/blog-cta.component';
import { NewsletterModalComponent } from '../../shared/components/newsletter-modal/newsletter-modal.component';
import { NewsletterButtonComponent } from '../../shared/components/newsletter-button/newsletter-button.component';
import { NewsletterService } from '../../shared/services/newsletter.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MarkdownPipe,
    NavbarComponent,
    FooterComponent,
    NewsletterSignupComponent,
    BlogCtaComponent,
    NewsletterModalComponent,
    NewsletterButtonComponent
  ],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  blogPost: BlogPost | undefined;
  popularPosts: BlogPost[] = [];
  categories: BlogCategory[] = [];
  relatedPosts: BlogPost[] = [];
  notFound = false;
  currentUrl: string = '';
  showNewsletterModal = false;
  private modalSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private newsletterService: NewsletterService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.currentUrl = this.document.location.href;

    this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug');
        if (!slug) {
          this.notFound = true;
          return of(undefined);
        }
        return this.blogService.getPostById(slug);
      })
    ).subscribe(post => {
      if (!post) {
        this.notFound = true;
      } else {
        this.blogPost = post;
        this.loadRelatedPosts(post);
        // Update current URL with the actual post URL
        this.currentUrl = this.document.location.href;
      }
    });

    this.loadPopularPosts();
    this.loadCategories();

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

  loadPopularPosts(): void {
    this.blogService.getPopularPosts().subscribe(posts => {
      this.popularPosts = posts;
    });
  }

  loadCategories(): void {
    this.blogService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadRelatedPosts(currentPost: BlogPost): void {
    this.blogService.getAllPosts().subscribe(posts => {
      // Filter out the current post and find posts with matching categories
      const relatedPosts = posts.filter(post =>
        post.id !== currentPost.id &&
        post.categories.some(category =>
          currentPost.categories.includes(category)
        )
      );

      // Get up to 3 related posts
      this.relatedPosts = relatedPosts.slice(0, 3);
    });
  }

  navigateToPost(slug: string): void {
    this.router.navigate(['/blog', slug]);
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['/blog'], { queryParams: { category: category.toLowerCase() } });
  }

  // Social media sharing functions
  shareOnFacebook(): void {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  }

  shareOnTwitter(): void {
    const text = this.blogPost ? this.blogPost.title : 'Check out this article';
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(this.currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  }

  shareOnLinkedIn(): void {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  }

  shareOnPinterest(): void {
    let imageUrl = '';
    if (this.blogPost && this.blogPost.featuredImage) {
      // Get the absolute URL for the image
      const baseUrl = this.document.location.origin;
      imageUrl = this.blogPost.featuredImage.startsWith('http')
        ? this.blogPost.featuredImage
        : `${baseUrl}/${this.blogPost.featuredImage.replace(/^\//, '')}`;
    }

    const description = this.blogPost ? this.blogPost.title : 'Check out this article';
    const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(this.currentUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(description)}`;
    window.open(url, '_blank', 'width=600,height=400');
  }
}
