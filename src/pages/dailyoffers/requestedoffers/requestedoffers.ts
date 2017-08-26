import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
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
  offerId:any;
  showLoader; boolean = true;
  AllRequest:any[];
  noData: boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private offerProvider: OfferProvider,
              public toastCtrl: ToastController
              ) {

      this.offerId = this.navParams.get('pageData');

      console.log(this.offerId);

  }

  ionViewDidLoad() {


  this.getRequests();  // Get All requests on Offer
    /*this.offerProvider
      .getPendingRequests(this.pageData)
      .subscribe(({status, data})=>{
      console.log(data);
        if (data.length <=0) {
          this.noData = true;
        } else {
          this.AllRequest = data;
        }
      })*/
  }


  acceptRequest(request) {
    console.log('you are going to accept this request');

    // Offer Owner in this page can take two action
    // refuse delivery status 4
    // accept Delivery status 1

    this.changeStatus(request,1)
  }

  cancelRequest(request) {
    console.log('you are going to cancel this request', request);

    // Offer Owner in this page can take two action
    // refuse delivery status 4
    // accept Delivery status 1

    this.changeStatus(request,4)

  }

  changeStatus(request, req_status) {
    this.offerProvider
      .changeRequestStatus(request.id, req_status)
      .subscribe(({status, message})=>{
        console.log(status, message); // message success update
        let index = this.AllRequest.indexOf(request);
        if (status === 200) {

          let msg = req_status == 1?'you have accepted to Deliver this request':'you have refused Delivery this Request';

          this.showToast(msg);

          this.AllRequest.splice(index, 1); // remove the refused request from page

          if(this.AllRequest.length<=0) // check if no more requests on my offer
            this.noData = true

        } else {
          this.showToast('something happened try again');
        }
      })
  }




  getRequests(event?:any) {
    this.offerProvider
      .getRequestsOnOffer(this.offerId)
      .subscribe(({status, data})=>{
        if(status == 200) {

          console.log('Data from server', data);
          if ( data.length <= 0 ) {
            this.noData = true;
            return false;
          } else {
            this.AllRequest = data.reverse();

          }
        } else {
            console.warn('error getting response ')


        }
      },err=>{
        console.warn(err);
        this.noData = true;
        this.showLoader = false;
        event&&event.complete();
      }, ()=> {
        this.showLoader = false;
        event&&event.complete();

      });
  }


  showToast(msg: string): void {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });

    toast.present();
  }
}
