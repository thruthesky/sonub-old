import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogSettingsDomainComponent } from './blog-settings-domain.component';
import { RouterModule, Routes } from '@angular/router';
import {
  MatToolbarModule, MatFormFieldModule, MatInputModule, MatButtonModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: BlogSettingsDomainComponent
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
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  declarations: [BlogSettingsDomainComponent]
})
export class BlogSettingsDomainModule { }
