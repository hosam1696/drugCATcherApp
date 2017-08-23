import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CartProvider} from "../../providers/cart.provider";
import {Storage} from "@ionic/storage";

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
  showLoader: boolean = true;
  pendingRequests: any[];
  offerdelivery: any[];
  requestdelivery: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cartProvider: CartProvider,
              private storage: Storage
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');

    this.storage.get('LoginData')
      .then(data=>{
        data = JSON.parse(data);
        this.cartProvider
          .getCartOffers(data.id)
          .subscribe(data=>{
            console.log(data);
            if(data.status == 200) {

              this.pendingRequests = data.pendingRequests;
              this.offerdelivery = data.offerdelivery;
              this.requestdelivery = data.requestdelivery;

            }
          })
      })
  }


  navigateTo(page:string, pageData):void {
    this.navCtrl.push(page, {pageData})
  }

}
