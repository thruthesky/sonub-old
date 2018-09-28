import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogManagementComponent } from './blog-management.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: BlogManagementComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatListModule,
    MatToolbarModule
  ],
  declarations: [BlogManagementComponent]
})
export class BlogManagementModule { }
