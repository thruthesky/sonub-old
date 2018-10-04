import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogSitemapComponent } from './blog-sitemap.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: BlogSitemapComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BlogSitemapComponent]
})
export class BlogSitemapModule { }
