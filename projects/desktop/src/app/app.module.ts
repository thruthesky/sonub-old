import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftComponent } from './components/left/left.component';
import { RightComponent } from './components/right/right.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftComponent,
    RightComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
