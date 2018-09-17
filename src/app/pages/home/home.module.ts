import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HeaderComponentModule } from '../../components/header/header.component.module';
import { AvatarComponentModule } from '../../components/avatar/avatar.component.module';
import { RequestPushNotificationComponent } from '../../components/request-push-notification/request-push-notification.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    HeaderComponentModule,
    AvatarComponentModule
  ],
  declarations: [
    HomePage,
    RequestPushNotificationComponent
  ]
})
export class HomePageModule {}
