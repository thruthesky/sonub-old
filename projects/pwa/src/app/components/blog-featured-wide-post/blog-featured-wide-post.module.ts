import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogFeaturedWidePostComponent } from './blog-featured-wide-post.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [BlogFeaturedWidePostComponent],
  exports: [BlogFeaturedWidePostComponent]
})
export class BlogFeaturedWidePostModule { }
