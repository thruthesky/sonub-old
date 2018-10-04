import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogAppIconComponent } from './blog-app-icon.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BlogAppIconComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BlogAppIconComponent]
})
export class BlogAppIconModule { }
