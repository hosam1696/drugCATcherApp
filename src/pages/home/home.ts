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
  testHide = true;
  showLoader: boolean = false;
  AllOffers: Offers[];
  showOptions:number;
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private storage: Storage,
              private homeProvider: HomeProvider
            ) {

  }
  async ionViewDidLoad() {
    let loginData = await this.storage.get('LoginData');
    this.showLoader = true;
    this.homeProvider
      .getOffers(JSON.parse(loginData).id)
      .subscribe(({status, data})=>{
        data.forEach(offer=>offer.options = false);
        if ( status == 200) {
          this.AllOffers = data.reverse();

          console.log(this.AllOffers);
        }
      }, err => {
        console.warn(err);
      }, ()=> {
        this.showLoader = false;
      });

    console.log('Login Data', JSON.parse(loginData));


  }

  private showRequestOptions(offer):void {
    offer.options = !offer.options;
  }

  private navigateToPage(page:string, pageData:any): void {
    this.navCtrl.push(page, {pageData});
  }
}
