import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'share/components/avatar/avatar.module';
import { RequestPushNotificationComponentModule } from 'share/components/request-push-notification/request-push-notification.module';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AvatarModule,
        RequestPushNotificationComponentModule
    ],
    exports: [],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule { }
