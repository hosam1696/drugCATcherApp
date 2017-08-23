import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {OfferProvider} from "../../../providers/offer.provider";

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
  pageData:any;
  showLoader; boolean = true;
  AllRequest:any[];
  noData: boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private offerProvider: OfferProvider
              ) {

      this.pageData = this.navParams.get('pageData');

      console.log(this.pageData);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestedoffersPage');
    this.offerProvider
      .getPendingRequests(this.pageData)
      .subscribe(({status, data})=>{
      console.log(data);
        if (data.length <=0) {
          this.noData = true;
        } else {
          this.AllRequest = data;
        }
      })
  }


  acceptRequest() {
    console.log('you are going to accept this request');
  }

  cancelRequest() {
    console.log('you are going to cancel this request');
  }

}
