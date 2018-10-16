import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SonubIntroComponent } from './sonub-intro.component';
import { MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  declarations: [SonubIntroComponent],
  exports: [SonubIntroComponent]
})
export class SonubIntroModule { }
