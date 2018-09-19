import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/mobile/header/header.component';

import {
  MatToolbarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule
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
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule, MatCheckboxModule, MatIconModule, MatListModule, MatInputModule, MatFormFieldModule,
    AppRoutingModule
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
    philgo.app('philgo-chat.config').subscribe(res => philgo.mergeConfig(res));
  }
}
