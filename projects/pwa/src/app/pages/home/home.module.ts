import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'share/components/avatar/avatar.module';
import { RequestPushNotificationComponentModule } from 'share/components/request-push-notification/request-push-notification.module';
import { BlogFeaturedPostsModule } from '../../components/blog-featured-posts/blog-featured-posts.module';


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
        RequestPushNotificationComponentModule,
        BlogFeaturedPostsModule
    ],
    exports: [],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule { }
