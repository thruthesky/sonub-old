import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogNewCommentsComponent } from './blog-new-comments.component';
import { RouterModule, Routes } from '@angular/router';
import { LoaderModule } from '../../../components/loader/loader.module';
import { SonubIntroModule } from '../../../components/sonub-intro/sonub-intro.module';
import { MatToolbarModule } from '@angular/material';



const routes: Routes = [
  {
    path: '',
    component: BlogNewCommentsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LoaderModule,
    SonubIntroModule,
    MatToolbarModule
  ],
  declarations: [BlogNewCommentsComponent]
})
export class BlogNewCommentsModule { }
