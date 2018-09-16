import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsDevInfoPage } from './settings-dev-info.page';
import { HeaderComponentModule } from '../../../components/header/header.component.module';

const routes: Routes = [
  {
    path: '',
    component: SettingsDevInfoPage
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
  declarations: [SettingsDevInfoPage]
})
export class SettingsDevInfoPageModule {}
