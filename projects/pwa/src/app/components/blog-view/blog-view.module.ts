import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogViewComponent } from './blog-view.component';
import { BlogReplyModule } from '../../components/blog-reply/blog-reply.module';
import { DisplayFilesModule } from 'share/philgo-api-components/display-files/display-files.module';
import { MatMenuModule, MatIconModule } from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    BlogReplyModule,
    DisplayFilesModule,
    MatMenuModule,
    MatIconModule
  ],
  declarations: [BlogViewComponent],
  exports: [BlogViewComponent]
})
export class BlogViewModule { }
