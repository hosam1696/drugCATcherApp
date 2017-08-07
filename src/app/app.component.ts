import { Component, ViewChild } from '@angular/core';
import {AlertController, AlertOptions, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any, badge?:boolean}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public alertCtrl: AlertController
              ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component:'HomePage'},
      { title: 'Daily Offers', component: 'DailyoffersPage', badge: true },
      { title: 'Cart', component: 'CartPage' ,badge: true },
      {title: 'History', component: 'HistoryPage', badge: true },
      {title: 'Wallet', component: 'WalletPage'},
      {title: 'Pharmacy Profile', component: 'PharmacyprofilePage'},
      {title: 'User Profile', component: 'UserprofilePage'},
      {title: 'Sign Out', component: 'LoginPage'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    if (page.component == 'LoginPage') {
      let alertOptions: AlertOptions = {
        title: 'Sign out !',
        message: 'Are you sure you want to sign out?',
        buttons: [
          {
            text: 'cancel',
            handler: ()=> {

            }
          },
          {
            text: 'ok',
            handler: () => {
              this.nav.setRoot(page.component);
            }
          }
        ]
      };
      this.alertCtrl.create(alertOptions).present();
    } else {

      this.nav.setRoot(page.component);
    }
  }
}
