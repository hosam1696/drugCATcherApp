import { Component } from '@angular/core';
import {NavController, IonicPage, ViewController} from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController) {

  }
  ionViewDidLoad() {
    console.log(this.viewCtrl);
    console.log(this.viewCtrl.name);
  }
}
