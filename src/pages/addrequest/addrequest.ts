import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddrequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addrequest',
  templateUrl: 'addrequest.html',
})
export class AddrequestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddrequestPage');
  }

  navigateTo(page, pageData= null) {
    if(!page)
      this.navCtrl.pop();
    else
     this.navCtrl.push(page, {pageData});

  }

  addRequest() {
    console.log('attempt to add request');
  }

}
