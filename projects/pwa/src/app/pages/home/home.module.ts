import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'share/components/avatar/avatar.module';
import { RequestPushNotificationComponentModule } from 'share/components/request-push-notification/request-push-notification.module';
import { BlogFeaturedPostsModule } from '../../components/blog-featured-posts/blog-featured-posts.module';
import { PostLineModule } from '../../components/post-line/post-line.module';
import { PostThumbnailWithTextModule } from '../../components/post-thumbnail-with-text/post-thumbnail-with-text.module';
import { PostMultilineWithThumbnailModule } from '../../components/post-multiline-with-thumbnail/post-multiline-with-thumbnail.module';
import { BlogMobileCategoryMenuModule } from '../../components/blog-mobile-category-menu/blog-mobile-category-menu.module';


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
        BlogFeaturedPostsModule,
        PostLineModule,
        PostThumbnailWithTextModule,
        PostMultilineWithThumbnailModule,
        BlogMobileCategoryMenuModule
    ],
    exports: [],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule { }
