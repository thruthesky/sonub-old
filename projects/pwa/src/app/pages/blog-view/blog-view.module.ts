import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogViewComponent } from './blog-view.component';
import { RouterModule, Routes } from '@angular/router';
import { BlogReplyModule } from '../../components/blog-reply/blog-reply.module';
import { DisplayFilesModule } from 'share/philgo-api-components/display-files/display-files.module';
import { BlogFeaturedPostsModule } from '../../components/blog-featured-posts/blog-featured-posts.module';


const routes: Routes = [
  {
    path: '',
    component: BlogViewComponent
  }
];




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BlogReplyModule,
    BlogFeaturedPostsModule,
    DisplayFilesModule
  ],
  declarations: [BlogViewComponent]
})
export class BlogViewModule { }
