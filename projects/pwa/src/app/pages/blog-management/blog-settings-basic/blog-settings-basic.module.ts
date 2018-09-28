import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogSettingsBasicComponent } from './blog-settings-basic.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: BlogSettingsBasicComponent
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
  declarations: [BlogSettingsBasicComponent]
})
export class BlogSettingsBasicModule { }
