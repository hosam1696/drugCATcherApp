import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddofferPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addoffer',
  templateUrl: 'addoffer.html',
})
export class AddofferPage {
  showLoader: boolean = false;
  pageType;
  dateNow =  new Date(Date.now()).toLocaleDateString();
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.pageType = this.navParams.get('pageData');

    console.log(this.pageType);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddofferPage');
    this.dateNow = new Date(Date.now()).toDateString();
  }

  AddOffer() {
    this.showLoader = true;
  }

  cancelOffer() {
    this.navCtrl.pop();
  }

}
