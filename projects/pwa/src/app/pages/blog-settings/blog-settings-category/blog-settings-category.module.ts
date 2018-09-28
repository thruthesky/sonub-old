import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogSettingsCategoryComponent } from './blog-settings-category.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: BlogSettingsCategoryComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [BlogSettingsCategoryComponent]
})
export class BlogSettingsCategoryModule { }
