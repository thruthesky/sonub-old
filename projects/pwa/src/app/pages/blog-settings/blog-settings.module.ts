import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogSettingsComponent } from './blog-settings.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: BlogSettingsComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [BlogSettingsComponent]
})
export class BlogSettingsModule { }
