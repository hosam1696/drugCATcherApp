import { Component, ViewChild } from '@angular/core';
import {AlertController, AlertOptions, Nav, Platform, ViewController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage} from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any, badge?:boolean, icon?:string}>;

  userEmail: string;
  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public alertCtrl: AlertController,
              public storage: Storage
              ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component:'HomePage'},
      { title: 'My Offers', component: 'DailyoffersPage', badge: false, icon:'daily-offers.png' },
      { title: 'Cart', component: 'CartPage' ,badge: false, icon:'cart-in-menu.png' },
      {title: 'History', component: 'HistoryPage', badge: false, icon:'history.png' },
      {title: 'Wallet', component: 'WalletPage', icon:'wallet.png'},
      {title: 'Sign Out', component: 'LoginPage', icon:'sign-out.png'}
    ];
/*
{title: 'Pharmacy Profile', component: 'PharmacyprofilePage', icon:'pharmacyprofile.png'},
      {title: 'User Profile', component: 'UserprofilePage', icon:'userprofile.png'},
*/


    this.storage.get('LoginData')
      .then(data=>{
        this.userEmail = JSON.parse(data).email;
      })
      .catch(err=>{
        console.log(err);
      })
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

              // Remove storage Data Before sign out
              Promise.all([
                this.storage.remove('LoginData'),
                this.storage.remove('UserData')
              ])
              .then(d=>{

                this.nav.setRoot(page.component);

              })
              .catch(err=> {
                console.warn('encountered an error during removig storage', err);
              })
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
