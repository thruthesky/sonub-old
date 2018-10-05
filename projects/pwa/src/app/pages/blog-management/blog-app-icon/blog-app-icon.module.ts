import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogAppIconComponent } from './blog-app-icon.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: BlogAppIconComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [BlogAppIconComponent]
})
export class BlogAppIconModule { }
