import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogViewComponent } from './blog-view.component';
import { RouterModule, Routes } from '@angular/router';
import { BlogViewModule } from '../../components/blog-view/blog-view.module';


const routes: Routes = [
  {
    path: '',
    component: BlogViewComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BlogViewModule
  ],
  declarations: [BlogViewComponent]
})
export class BlogViewPageModule { }
