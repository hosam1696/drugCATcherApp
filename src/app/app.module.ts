import { TermsModal } from './../pages/modals/terms';
import { UserProvider } from './../providers/user';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {ReactiveFormsModule} from '@angular/forms'
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GappProvider } from '../providers/gappproviders';

import  { Geolocation} from "@ionic-native/geolocation"
import {HttpModule} from "@angular/http";
import {AppProv} from "./config/appprov";
import {HistoryProvider} from "../providers/history.provider";
import {HomeProvider} from "../providers/home.provider";
import {CartProvider} from "../providers/cart.provider";
import {OfferProvider} from "../providers/offer.provider";

@NgModule({
  declarations: [
    MyApp,
    TermsModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
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
    {provide: 'API_URL', useValue:'http://drugcatcher.com/api/'},
    GappProvider,
    UserProvider,
    Geolocation,
    HistoryProvider,
    HomeProvider,
    CartProvider,
    OfferProvider
  ]
})
export class AppModule {}
