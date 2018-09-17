import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreatePage } from './create.page';
import { HeaderComponentModule } from '../../components/header/header.component.module';
import { AvatarComponentModule } from '../../components/avatar/avatar.component.module';

import { NgSimpleEditorModule } from 'ng-simple-editor';
import { FilesComponentModule } from '../../modules/components/forum/files/files.module';

const routes: Routes = [
  {
    path: '',
    component: CreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HeaderComponentModule,
    AvatarComponentModule,
    NgSimpleEditorModule,
    FilesComponentModule
  ],
  declarations: [CreatePage]
})
export class CreatePageModule {}
