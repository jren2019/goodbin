import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../shared/services/blog.service';
import { BlogPost } from '../../shared/models/blog.model';

@Component({
  selector: 'app-blog-preview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="blog-preview">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Latest from Our Blog</h2>
          <div class="title-underline"></div>
          <p class="section-subtitle">
            Get valuable insights and tips on waste management, sustainability, and eco-friendly practices.
          </p>
        </div>

        <div class="blog-grid">
          <div *ngFor="let post of latestPosts" class="blog-card" [routerLink]="['/blog', post.slug]">
            <div class="blog-img-container">
              <img [src]="post.featuredImage" [alt]="post.title" class="blog-img">
            </div>
            <div class="blog-content">
              <div class="blog-meta">
                <span class="blog-date">{{post.date}}</span>
              </div>
              <h3 class="blog-title">{{post.title}}</h3>
              <p class="blog-excerpt">{{post.excerpt | slice:0:100}}...</p>
              <a [routerLink]="['/blog', post.slug]" class="blog-read-more">Read More</a>
            </div>
          </div>
        </div>

        <div class="view-all-container">
          <a routerLink="/blog" class="view-all-btn">View All Posts</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .blog-preview {
      padding: 5rem 0;
      background-color: #0b132b;
      border-top: 1px solid rgba(90, 203, 210, 0.1);
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 1rem;
    }

    .title-underline {
      height: 3px;
      width: 80px;
      background: #5acbd2;
      margin: 0 auto 1.5rem;
    }

    .section-subtitle {
      font-size: 1.1rem;
      color: #a8b2d1;
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .blog-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .blog-card {
      background: #131d3b;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
      cursor: pointer;
    }

    .blog-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    }

    .blog-img-container {
      height: 200px;
      overflow: hidden;
    }

    .blog-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .blog-card:hover .blog-img {
      transform: scale(1.05);
    }

    .blog-content {
      padding: 1.5rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .blog-meta {
      display: flex;
      justify-content: space-between;
      color: #a8b2d1;
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }

    .blog-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: #fff;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .blog-excerpt {
      color: #a8b2d1;
      font-size: 0.9rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .blog-read-more {
      color: #5acbd2;
      font-weight: 600;
      text-decoration: none;
      margin-top: auto;
      padding-top: 1rem;
      position: relative;
      display: inline-block;
    }

    .blog-read-more:hover {
      color: #e61960;
    }

    .view-all-container {
      text-align: center;
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
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .view-all-btn:hover {
      background-color: rgba(90, 203, 210, 0.1);
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    /* Responsive adjustments */
    @media (max-width: 992px) {
      .blog-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .section-title {
        font-size: 2rem;
      }

      .blog-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
  `]
})
export class BlogPreviewComponent implements OnInit {
  latestPosts: BlogPost[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadLatestPosts();
  }

  loadLatestPosts(): void {
    this.blogService.getAllPosts().subscribe(posts => {
      this.latestPosts = posts.slice(0, 3);  // Get first 3 posts
    });
  }
}
