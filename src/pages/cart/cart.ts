import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CartProvider} from "../../providers/cart.provider";
import {Storage} from "@ionic/storage";
import {ILoginData} from "../../app/config/appinterfaces";

/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  moreData: boolean = true;
  noData: boolean = false;
  showLoader: boolean = true;
  pendingRequests: any[] = [];
  offerDelivery: any[] = [];
  requestDelivery: any[] = [];
  AllRequestTypes: any[] = [];
  loginData: ILoginData|any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cartProvider: CartProvider,
              private storage: Storage
              ) {
  }

  async ionViewWillEnter() {
    console.log('ionViewDidLoad CartPage');

    this.loginData = JSON.parse(await this.storage.get('LoginData'));

    this.getCartRequest();  // Get All Request On Cart
  }

  async ionViewDidLoad() {



  }

  getCartRequest(event?:any) {
    this.cartProvider
      .getCartOffers(this.loginData.id)
      .subscribe(data=>{
        console.log(data);
        if(data.status == 200) {

          this.pendingRequests = data.pendingrequest.map(pending=>{pending.type='pendingRequest';return pending});
          this.offerDelivery = data.offerdelivery.map(pending=>{pending.type='offerDelivery';return pending});
          this.requestDelivery = data.requestdelivery.map(pending=>{pending.type='requestDelivery';return pending});

          this.AllRequestTypes = [...this.pendingRequests, ...this.offerDelivery, ...this.requestDelivery].reverse();

          if (this.AllRequestTypes.length <= 0)
            this.noData = true;
          console.log('All Requests On Cart',this.AllRequestTypes);
        }
      }, (err )=> {
        console.warn(err);
        [this.showLoader, this.noData ]= [false, true];
        event&&event.complete()
      }, ()=> {
        this.showLoader = false;
        event&&event.complete()
      })
  }
  navigateTo(page:string, pageData):void {
    this.navCtrl.push(page, {pageData})
  }

  detectColor(type,status):string {
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

  private selectImg(type:string):string {
    switch (type) {
      case 'pendingRequest':
        return 'assets/icons/pending offer.png';
      case 'requestDelivery':
        return 'assets/icons/request delivery.png';
      case 'offerDelivery':
        return 'assets/icons/offerdelivery.png';
      default:
        return 'assets/icons/pending offer.png'
    }
  }

}
