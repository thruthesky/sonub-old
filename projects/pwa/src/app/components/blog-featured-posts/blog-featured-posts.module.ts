import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogFeaturedPostsComponent } from './blog-featured-posts.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BlogFeaturedPostsComponent],
  exports: [BlogFeaturedPostsComponent]
})
export class BlogFeaturedPostsModule { }
