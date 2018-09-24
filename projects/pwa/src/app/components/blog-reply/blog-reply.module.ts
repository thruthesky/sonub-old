import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogReplyComponent } from './blog-reply.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BlogReplyComponent],
  exports: [BlogReplyComponent]
})
export class BlogReplyModule { }
