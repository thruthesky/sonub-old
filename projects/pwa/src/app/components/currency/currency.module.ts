import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from './currency.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CurrencyComponent],
  exports: [CurrencyComponent]
})
export class CurrencyModule { }
