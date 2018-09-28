import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogNewCommentsComponent } from './blog-new-comments.component';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: BlogNewCommentsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BlogNewCommentsComponent]
})
export class BlogNewCommentsModule { }
