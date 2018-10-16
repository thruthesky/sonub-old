import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoComponent } from './seo.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from '../../components/loader/loader.module';
import { MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(<Routes>[{
      path: '', component: SeoComponent
    }]),
    FormsModule,
    LoaderModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [SeoComponent]
})
export class SeoModule { }
