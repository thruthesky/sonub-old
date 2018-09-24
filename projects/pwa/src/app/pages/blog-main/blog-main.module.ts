import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogMainComponent } from './blog-main.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: BlogMainComponent
  }
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [BlogMainComponent]
})
export class BlogMainModule { }
