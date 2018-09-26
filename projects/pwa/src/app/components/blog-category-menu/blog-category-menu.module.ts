import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCategoryMenuComponent } from './blog-category-menu.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule
  ],
  declarations: [BlogCategoryMenuComponent],
  exports: [BlogCategoryMenuComponent]
})
export class BlogCategoryMenuModule { }
