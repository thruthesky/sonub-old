import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogSettingsBasicComponent } from './blog-settings-basic.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BlogSettingsBasicComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BlogSettingsBasicComponent]
})
export class BlogSettingsBasicModule { }
