import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogFeaturedPostsComponent } from './blog-featured-posts.component';
import { PostThumbnailWithTextOnTopModule } from '../post-thumbnail-with-text-on-top/post-thumbnail-with-text-on-top.module';

@NgModule({
  imports: [
    CommonModule,
    PostThumbnailWithTextOnTopModule
  ],
  declarations: [BlogFeaturedPostsComponent],
  exports: [BlogFeaturedPostsComponent]
})
export class BlogFeaturedPostsModule { }
