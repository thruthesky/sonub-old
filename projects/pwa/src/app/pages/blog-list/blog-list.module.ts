import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogListComponent } from './blog-list.component';
import { RouterModule, Routes } from '@angular/router';
import { BlogViewModule } from '../../components/blog-view/blog-view.module';



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
    BlogViewModule
  ],
  declarations: [BlogListComponent]
})
export class BlogListModule { }



