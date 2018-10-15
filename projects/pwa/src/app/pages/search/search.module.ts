import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(<Routes>[
      { path: '', component: SearchComponent }
    ]),
    HttpClientModule
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }
