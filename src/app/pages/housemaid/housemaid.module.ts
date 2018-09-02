import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HousemaidPage } from './housemaid.page';
import { HeaderComponentModule } from '../../components/header/header.component.module';

const routes: Routes = [
  {
    path: '',
    component: HousemaidPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HeaderComponentModule
  ],
  declarations: [HousemaidPage]
})
export class HousemaidPageModule { }
