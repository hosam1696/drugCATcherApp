import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {OfferProvider} from "../../providers/offer.provider";
import  {Storage} from "@ionic/storage";
import {ERequestType} from "../../app/config/appinterfaces";
/**
 * Generated class for the RecordDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-record-details',
  templateUrl: 'record-details.html',
})
export class RecordDetailsPage {
  RequestType: string;
  pageData:any;
  LoginData: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              public toastCtrl: ToastController,
              private offerProvider: OfferProvider
              ) {

    this.pageData = this.navParams.get('pageData');

    console.log('Page Data from Cart Page', this.pageData);

    this.RequestType = this.pageData.type;

  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad RecordDetailsPage');
    this.LoginData =  JSON.parse(await this.storage.get('LoginData'));

    console.log('Login Data',this.LoginData);

  }


  unchangeDate(date) {
    return new Date(date).toISOString();
  }

  detectColor(type):string {
    switch (type) {
      case 'offerDelivery':
        return 'primary';
      case 'requestDelivery':
        return 'light';
      case 'pendingRequest':
        return 'lightDark';
      default:
        return 'light'
    }
  }

  Cancel() {
    console.log('you are about to cancel the request');
    this.changeStatus(this.CancelStatus);  // user who requests canceled the offer
  }

   get CancelStatus():number {
    let offerType = this.pageData.type;
    //let [userId, offerUserId, offerOwnerId, offerType, offerStatus] = [this.LoginData.id, this.pageData.user_id, this.pageData.offer_user_id, this.pageData.type, this.pageData.status];

    //console.log(userId, offerUserId, offerOwnerId, offerType, offerStatus);

    if(offerType == 'pendingRequest') {
      return 5
    } else if (offerType == 'requestDelivery') {
      return 2;
    } else if (offerType == 'offerDelivery') {
      return 3;
    } else {
      return 7 // this is an error
    }
  }
  changeStatus(req_status: number): void {
    this.offerProvider
      .changeRequestStatus(this.pageData.req_id, req_status)
      .subscribe(({status, message})=> {
      console.log(status, message);
        if (status == 200) {
          let msg = req_status == 6?'Delivered':'you have cancelled your request on that offer';
          this.showToast(msg,
            ()=>{
            this.navCtrl.pop();
            }
            );

        }
      }, err=>{
        console.warn(err);
      })
  }

  Delivered() {
    console.log('you are about to confirm that you delivered the offer');
    this.changeStatus(6)
  }

  showToast(msg: string, callback?:any): void {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1800,
      position: 'bottom'
    });
    toast.onDidDismiss(callback);
    toast.present();
  }

  private setTitle(type:string):string {
    return ERequestType[type];
  }

}
