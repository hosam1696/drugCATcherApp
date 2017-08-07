import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChooseaddorjoinPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chooseaddorjoin',
  templateUrl: 'chooseaddorjoin.html',
})
export class ChooseaddorjoinPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseaddorjoinPage');
  }

  backStep() {
    this.navCtrl.pop();
  }

  navigateToPage(page, pageData?:any) {
    this.navCtrl.push(page, {pageData});
  }

}
