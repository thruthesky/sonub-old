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
import { RedirectComponent } from './pages/redirect/redirect.component';
import { LazyLoaderModule } from './components/lazy-loader/lazy-loader.module';
import { CurrencyModule } from './components/currency/currency.module';
import { WeatherModule } from './components/weather/weather.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DialogModule } from 'share/components/dialog/dialog.module';
import { AvatarModule } from 'share/components/avatar/avatar.module';
import { AdvModule } from 'share/philgo-api-components/adv/adv.module';
import { FormsModule } from '@angular/forms';


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
    DesktopRightComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSnackBarModule,
    CookieModule.forRoot(),
    AppRoutingModule,
    PageNotFoundModule,
    LogoModule,
    FooterModule,
    LazyLoaderModule,
    CurrencyModule,
    WeatherModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    DialogModule,
    AvatarModule,
    AdvModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    // router: Router,
    private philgo: PhilGoApiService
  ) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));

    philgo.setServerUrl(environment.philgoServerUrl);         // philgo api. 'api.php'
    philgo.setFileServerUrl(environment.philgoFileServerUrl); // philgo file server. 'https://file.philgo.com/index.php'
    philgo.setNewFileServerUrl(environment.newFileServerUrl); // new file server.

    philgo.sessionStorage = 'cookie'; // How do you want to save login information. 'cookie' or 'localStorage'
    philgo.cookieDomain = 'sonub.com'; // if cookie is chosen, put a root domain to share with its subdomains.

    philgo.setFirebaseApp(firebase); // firebase

    // philgo.app('sonub.config').subscribe(res => { // get site(app) config from server.
    //   console.log('sonub config', res);
    //   philgo.mergeConfig(res);
    // });
  }
}
