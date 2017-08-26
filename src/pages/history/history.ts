import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HistoryProvider} from "../../providers/history.provider";
import {Storage} from '@ionic/storage';
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
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private historyProvider: HistoryProvider
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');

    this.storage.get('LoginData')
      .then(data=>{
        data = JSON.parse(data);
        console.log('Login Data from Storage in History Page',data);

        if (data.id) {
          this.historyProvider
            .getHistory(data.id)
            .subscribe(data=>{
              console.log(data)
            }, err => {
              this.showLoader = false;
              console.warn(err);
            }, ()=>{
              this.showLoader = false;
            })
        } else {
          console.info('no user id ');
        }

      })
  }

}
