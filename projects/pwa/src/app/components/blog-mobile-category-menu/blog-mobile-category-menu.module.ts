import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogMobileCategoryMenuComponent } from './blog-mobile-category-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [BlogMobileCategoryMenuComponent],
  exports: [BlogMobileCategoryMenuComponent]
})
export class BlogMobileCategoryMenuModule { }
