import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostThumbnailWithTextComponent } from './post-thumbnail-with-text.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PostThumbnailWithTextComponent],
  exports: [PostThumbnailWithTextComponent]
})
export class PostThumbnailWithTextModule { }
