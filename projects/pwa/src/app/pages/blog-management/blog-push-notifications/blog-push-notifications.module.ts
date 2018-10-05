import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPushNotificationsComponent } from './blog-push-notifications.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BlogPushNotificationsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BlogPushNotificationsComponent]
})
export class BlogPushNotificationsModule { }
