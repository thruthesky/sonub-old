import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogStatVisitorComponent } from './blog-stat-visitor.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: BlogStatVisitorComponent
  }
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BlogStatVisitorComponent]
})
export class BlogStatVisitorModule { }
