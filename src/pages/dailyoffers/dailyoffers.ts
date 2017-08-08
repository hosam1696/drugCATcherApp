import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DailyoffersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dailyoffers',
  templateUrl: 'dailyoffers.html',
})
export class DailyoffersPage {
  showLoader: boolean = true;
  noOffers: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyoffersPage');
    setTimeout(()=> {
      this.showLoader = false;
      this.noOffers = true;
    }, 2000)
  }

  navigateTo(page) {
    this.navCtrl.push(page);
  }

}
