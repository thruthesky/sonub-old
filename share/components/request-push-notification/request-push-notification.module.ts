import { NgModule } from '@angular/core';

import { RequestPushNotificationComponent } from './request-push-notification.component';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule
    ],
    exports: [
        RequestPushNotificationComponent
    ],
    declarations: [RequestPushNotificationComponent],
    providers: [],
})
export class RequestPushNotificationComponentModule { }
