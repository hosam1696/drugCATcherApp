import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {OfferProvider} from "../../providers/offer.provider";
import {Offers} from "../../app/config/appinterfaces";
import "rxjs/add/operator/toPromise";

/**
 * Generated class for the DailyoffersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dailyoffers',
  templateUrl: 'dailyoffers.html',
})
export class DailyoffersPage {
  showLoader: boolean = true;
  noOffers: boolean = false;
  testHide: boolean = true;

  AllOffers: Offers[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private offerProvider: OfferProvider,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyoffersPage');

    this.storage.get('LoginData')
      .then(data=>{
        console.log('storage data', data);
        data = JSON.parse(data);

        this.offerProvider
          .getUserOffers(data.id)
          .subscribe(({status, data})=>{
            if (status == 200) {
              if(data.length <=0) {
                this.noOffers = true;
                return false;
              } else {
                this.AllOffers = data.reverse();

                console.log(this.AllOffers);
              }
            }
            console.log('Offers data',data);
          }, err => {
          console.warn(err);
          this.showLoader = false;
          }, ()=> {
          this.showLoader = false;
          })
      });

    /*setTimeout(()=> {
      this.showLoader = false;
      this.AllOffers = true;
      //this.noOffers = true;
    }, 1000)*/
  }

  /*async checkPendingRequest() {
    this.AllOffers.forEach(offer=>{
      let req=  await this.offerProvider.getPendingRequestsPromise(offer.id);

    });
  }*/

  deleteOffer(id) {

    console.log('you are about to delete this offer');
    this.alertCtrl.create({
      title: 'Are tou sure you want to delete this offer?',
      buttons: [
      {
        text: 'No',
        handler: ()=> {

        }
      },
        {
          text: 'Yes',
          handler: () => {
            this.offerProvider
              .DeleteOffer(id)
              .subscribe(data => {
                let index = this.AllOffers.findIndex(offer=> offer.id == id);
                console.log(data);
                if(data.message == "delleted succefully") {
                  this.AllOffers.splice(index,1);
                  this.showToast('Offer Deleted Successfully');
                }

              })

          }
        }
    ]

    }).present();


  }

  editOffer(offer) {
    console.log('you are about to edit this offer');
    this.navCtrl.push('AddofferPage',{pageData:offer});
  }

  navigateTo(page, pageData?:any) {
    this.navCtrl.push(page, {pageData});
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

}
