import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogListComponent } from './blog-list.component';
import { RouterModule, Routes } from '@angular/router';
import { BlogViewModule } from '../../components/blog-view/blog-view.module';
import { BlogCategoryTopMenuModule } from '../../components/blog-category-top-menu/blog-category-top-menu.module';



const routes: Routes = [
  {
    path: '',
    component: BlogListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild( routes ),
    BlogViewModule,
    BlogCategoryTopMenuModule
  ],
  declarations: [BlogListComponent]
})
export class BlogListModule { }



