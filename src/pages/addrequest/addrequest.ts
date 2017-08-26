import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {Offers} from "../../app/config/appinterfaces";
import {OfferProvider} from "../../providers/offer.provider";
import {Storage} from "@ionic/storage";

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
  @ViewChild('RQ') reqQuantity: ElementRef;
  showLoader: boolean = false;
  pageData: Offers;
  userId: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private offerProvider: OfferProvider,
    private storage: Storage
    ) {
  }

  ionViewDidLoad() {

    this.pageData = this.navParams.get('pageData');

    console.log(this.pageData);

    this.storage.get('LoginData')
      .then(login=>{
        login = JSON.parse(login);
        this.userId = login.id;
      })
  }

  navigateTo(page, pageData = null) {
    if (!page)
      this.navCtrl.pop();
    else
      this.navCtrl.push(page, { pageData });

  }

  addRequest(reqValue) {
    if (reqValue && reqValue  > 0) {
      this.showLoader = true;
      console.log('attempt to add request');

      //check if the requested quantity is smaller than the offer

      this.offerProvider.AddRequestOffer({offer_id: this.pageData.offer_id, user_id: this.userId,offer_user_id: this.pageData.user_id, quantity:reqValue}).subscribe(data=>{
        console.log(data);
        if (data.status == 200) {
          this.showToast('your request had been sent successfully',
            ()=>{
              this.navCtrl.setRoot('HomePage')
            });

        }
      }, err=>{
        console.warn(err);
        this.showLoader =false;
      }, ()=> {
        this.showLoader=false
      });

      /*setTimeout(()=>{
        this.showToast('your request had been sent successfully');
        this.showLoader = false;
        setTimeout(()=>{
          this.navCtrl.setRoot('HomePage');
        }, 1000);
      }, 1500);*/
    } else {
      this.showToast('requested value is empty');
    }
  }

  private limitQuantityValue(val) {

    let maxValue = this.pageData.quantity;

    this.reqQuantity.nativeElement.value = Math.max(1,Math.min(val,maxValue));
  }

  showToast(msg, callback?:any) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.onDidDismiss(callback);
    toast.present();
  }

}
