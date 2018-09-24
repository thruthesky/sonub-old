import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostLineComponent } from './post-line.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [PostLineComponent],
  exports: [PostLineComponent]
})
export class PostLineModule { }
