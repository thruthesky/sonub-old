import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForumPage } from './forum.page';
import { HeaderComponentModule } from '../../components/header/header.component.module';
import { ForumBasicListComponentModule } from '../../modules/components/forum/basic/list/basic-list.component.module';
import { AdvLoaderComponentModule } from '../../components/adv-loader/adv-loader.module';

const routes: Routes = [
  {
    path: '',
    component: ForumPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HeaderComponentModule,
    ForumBasicListComponentModule,
    AdvLoaderComponentModule
  ],
  declarations: [ForumPage]
})
export class ForumPageModule {}
