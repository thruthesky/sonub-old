import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SonubIntroComponent } from './sonub-intro.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SonubIntroComponent],
  exports: [SonubIntroComponent]
})
export class SonubIntroModule { }
