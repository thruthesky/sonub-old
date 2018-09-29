import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogStatVisitorComponent } from './blog-stat-visitor.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule} from '@angular/material';


const routes: Routes = [
  {
    path: '',
    component: BlogStatVisitorComponent
  }
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule
  ],
  declarations: [BlogStatVisitorComponent]
})
export class BlogStatVisitorModule { }
