import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/mobile/header/mobile-header.component';

import {
  MatToolbarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule
} from '@angular/material';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app.routing.module';
import { HelpComponent } from './pages/help/help.component';
import { MenuComponent } from './pages/menu/menu.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SettingsComponent } from './pages/settings/settings.component';



import * as firebase from 'firebase/app';
import { HttpClientModule } from '@angular/common/http';
import { PhilGoApiService } from 'share/philgo-api/philgo-api.service';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { DesktopHeaderComponent } from './components/desktop/header/desktop-header.component';
import { DesktopLeftComponent } from './components/desktop/left/left.component';
import { DesktopRightComponent } from './components/desktop/right/right.component';
import { RequestPushNotificationComponent } from 'share/components/request-push-notification/request-push-notification.component';
import { AvatarComponent } from 'share/components/avatar/avatar.component';
import { PostComponent } from './pages/post/post.component';

import { NgSimpleEditorModule } from 'ng-simple-editor';
import { ForumComponent } from './pages/forum/forum.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DisplayFilesModule } from 'share/philgo-api-components/display-files/display-files.module';


/**
 * Shared Components
 */
import { ComponentServiceModule } from 'share/philgo-api-components/service/component.service.module';
import { RegisterComponentModule } from 'share/philgo-api-components/user/register/register.module';
import { LoginComponentModule } from 'share/philgo-api-components/user/login/login.component.module';
import { JobComponent } from './pages/job/job.component';
import { ForumBasicListModule } from 'share/philgo-api-components/forum/basic/forum-basic-list/forum-basic-list.module';
import { JobListComponentModule } from 'share/philgo-api-components/forum/job/list/job-list.component.module';

const firebaseConfig = {
  apiKey: 'AIzaSyA1X3vpzSpUk_JHCbNjEwQe1-pduF0Enqs',
  authDomain: 'philgo-64b1a.firebaseapp.com',
  databaseURL: 'https://philgo-64b1a.firebaseio.com',
  projectId: 'philgo-64b1a',
  storageBucket: 'philgo-64b1a.appspot.com',
  messagingSenderId: '675064809117'
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    HelpComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    DesktopHeaderComponent,
    DesktopLeftComponent,
    DesktopRightComponent,
    RequestPushNotificationComponent,
    AvatarComponent,
    PostComponent,
    ForumComponent,
    BlogComponent,
    PageNotFoundComponent,
    JobComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule, MatCheckboxModule, MatIconModule, MatListModule, MatInputModule, MatFormFieldModule,
    AppRoutingModule,
    MatCardModule, MatSnackBarModule,
    AppRoutingModule,
    NgSimpleEditorModule,
    DisplayFilesModule,
    ComponentServiceModule,
    RegisterComponentModule,
    LoginComponentModule,
    ForumBasicListModule,
    JobListComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private philgo: PhilGoApiService) {
    philgo.setServerUrl(environment.philgoServerUrl);
    philgo.setFileServerUrl(environment.philgoFileServerUrl);
    philgo.setNewFileServerUrl(environment.newFileServerUrl);
    philgo.setFirebaseApp(firebase);
    // philgo.loadPostConfigs().subscribe(res => { });
    philgo.app('sonub.config').subscribe(res => {
      console.log('sonub config', res);
      philgo.mergeConfig(res);
    });
  }
}
