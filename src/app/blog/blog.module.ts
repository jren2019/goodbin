import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BLOG_ROUTES } from './blog.routes';
import { MarkdownPipe } from '../shared/pipes/markdown.pipe';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(BLOG_ROUTES),
    BlogListComponent,
    BlogDetailComponent,
    MarkdownPipe
  ]
})
export class BlogModule { }
