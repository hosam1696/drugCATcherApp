import { Offers } from './../../app/config/appinterfaces';
import { Component } from '@angular/core';
import {NavController, IonicPage, ViewController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {HomeProvider} from "../../providers/home.provider";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  showLoader: boolean = true;
  AllOffers: Offers[];
  showOptions:number;
  loginData: any;
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private storage: Storage,
              private homeProvider: HomeProvider
            ) {

  }
  async ionViewDidLoad() {

    this.loginData = JSON.parse(await this.storage.get('LoginData')); // Get Login Data userid from 

    console.log('Login Data \n', this.loginData);

    this.getOffers();


  }

  private showRequestOptions(offer):void {
    offer.options = !offer.options;
  }

  private navigateToPage(page:string, pageData:any): void {
    this.navCtrl.push(page, {pageData});
  }


  private getOffers(event?:any):void {
    this.homeProvider     // Get Offers from DB
    .getOffers(this.loginData.id)
    .subscribe(({status, data})=>{
      data.forEach(offer=>offer.options = false);
      if ( status == 200) {
        this.AllOffers = data.reverse();

        console.log(this.AllOffers);
      }
    }, err => {
      console.warn(err);
      event&&event.complete();
    }, ()=> {
      this.showLoader = false;
      event&&event.complete();
    });
  }
}
