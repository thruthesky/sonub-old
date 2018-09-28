import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCategoryTopMenuComponent } from './blog-category-top-menu.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule
  ],
  declarations: [BlogCategoryTopMenuComponent],
  exports: [BlogCategoryTopMenuComponent]
})
export class BlogCategoryTopMenuModule { }
