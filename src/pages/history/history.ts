import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HistoryProvider} from "../../providers/history.provider";
import {Storage} from '@ionic/storage';
import {ILoginData} from "../../app/config/appinterfaces";
/**
 * Generated class for the HistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  showLoader: boolean = true;
  noData:boolean = false;
  LoginData: ILoginData|any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private historyProvider: HistoryProvider
              ) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    this.LoginData = JSON.parse(await this.storage.get('LoginData'));

    console.log('Login data In History');

    if (this.LoginData) {
      this.getHistory()
    } else {
      console.log('No User No History')
    }
  }

  private getHistory(event?:any): void {
    this.historyProvider
      .getHistory(this.LoginData.id)
      .subscribe(data=>{
        console.log(data)
      }, err => {
        this.showLoader = false;
        console.warn(err);
        event&&event.complete()

      }, ()=>{
        this.showLoader = false;
        event&&event.complete()
      })

  }


  navigateTo(page:string, pageData: any):void {
    this.navCtrl.push(page,{pageData});
  }
}
