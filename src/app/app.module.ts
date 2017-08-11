import { TermsModal } from './../pages/modals/terms';
import { UserProvider } from './../providers/user';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {ReactiveFormsModule} from '@angular/forms'
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GappProvider } from '../providers/gappproviders';

import  { Geolocation} from "@ionic-native/geolocation"
import {HttpModule} from "@angular/http";
import {AppProv} from "./config/appprov";

@NgModule({
  declarations: [
    MyApp,
    TermsModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonColor: 'secondary',
      backButtonIcon: 'ios-arrow-back'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TermsModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppProv,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GappProvider,
    UserProvider,
    Geolocation
  ]
})
export class AppModule {}
