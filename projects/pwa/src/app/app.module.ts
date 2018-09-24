import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/mobile/header/mobile-header.component';

import {
  MatToolbarModule,
  MatSnackBarModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';


import * as firebase from 'firebase/app';
import { HttpClientModule } from '@angular/common/http';
import { PhilGoApiService } from 'share/philgo-api/philgo-api.service';
import { environment } from '../environments/environment';
import { DesktopHeaderComponent } from './components/desktop/header/desktop-header.component';
import { DesktopLeftComponent } from './components/desktop/left/left.component';
import { DesktopRightComponent } from './components/desktop/right/right.component';
import { PageNotFoundModule } from './pages/page-not-found/page-not-found.module';


import { CookieModule } from 'ngx-cookie';
import { LogoModule } from './components/logo/logo.module';
import { FooterModule } from './components/footer/footer.module';



/**
 * Firebase
 */
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
    DesktopHeaderComponent,
    DesktopLeftComponent,
    DesktopRightComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSnackBarModule,
    CookieModule.forRoot(),
    AppRoutingModule,
    PageNotFoundModule,
    LogoModule,
    FooterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private philgo: PhilGoApiService) {

    philgo.setServerUrl(environment.philgoServerUrl);         // philgo api. 'api.php'
    philgo.setFileServerUrl(environment.philgoFileServerUrl); // philgo file server. 'https://file.philgo.com/index.php'
    philgo.setNewFileServerUrl(environment.newFileServerUrl); // new file server.

    philgo.sessionStorage = 'cookie'; // How do you want to save login information. 'cookie' or 'localStorage'
    philgo.cookieDomain = 'sonub.com'; // if cookie is chosen, put a root domain to share with its subdomains.

    philgo.setFirebaseApp(firebase); // firebase

    philgo.app('sonub.config').subscribe(res => { // get site(app) config from server.
      console.log('sonub config', res);
      philgo.mergeConfig(res);
    });
  }
}
