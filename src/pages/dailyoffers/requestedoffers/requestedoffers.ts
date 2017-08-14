import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RequestedoffersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requestedoffers',
  templateUrl: 'requestedoffers.html',
})
export class RequestedoffersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestedoffersPage');
  }


  acceptRequest() {
    console.log('you are going to accept this request');
  }

  cancelRequest() {
    console.log('you are going to cancel this request');
  }

}
