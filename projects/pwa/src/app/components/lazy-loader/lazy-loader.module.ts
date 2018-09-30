import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoaderComponent } from './lazy-loader.component';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  declarations: [LazyLoaderComponent],
  exports: [LazyLoaderComponent]
})
export class LazyLoaderModule { }
