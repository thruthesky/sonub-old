import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogStatVisitorComponent } from './blog-stat-visitor.component';
import { RouterModule, Routes } from '@angular/router';
import {
  MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
  MatToolbarModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: BlogStatVisitorComponent
  }
];



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  declarations: [BlogStatVisitorComponent]
})
export class BlogStatVisitorModule { }