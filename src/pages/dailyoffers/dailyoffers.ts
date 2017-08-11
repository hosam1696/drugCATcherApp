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
  testHide: boolean = true;
  AllOffers: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyoffersPage');
    setTimeout(()=> {
      this.showLoader = false;
      this.AllOffers = true;
      //this.noOffers = true;
    }, 1000)
  }

  deleteOffer() {
    console.log('you are about to delete this offer');
  }

  editOffer() {
    console.log('you are about to edit this offer');
    this.navCtrl.push('AddofferPage',{pageData:'edit'});
  }

  navigateTo(page) {
    this.navCtrl.push(page);
  }

  showOfferOptions() {
    this.testHide = !this.testHide;
  }

}
