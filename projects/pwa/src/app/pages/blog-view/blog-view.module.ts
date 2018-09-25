import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogViewComponent } from './blog-view.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: BlogViewComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BlogViewComponent]
})
export class BlogViewModule { }
