import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddrequestPage');
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
  
      setTimeout(()=>{
        this.showToast('your request had been sent successfully');
        this.showLoader = false;
        setTimeout(()=>{
          this.navCtrl.setRoot('HomePage');
        }, 1000);
      }, 1500);
    } else {
      this.showToast('requested value is empty');
    }
  }

  private keepItNumber(value) {

    console.log(value);

    value = value.split('');
    let enteredKey = value[value.length - 1];
    console.log(value, enteredKey);
    /*
    let targetVal:string = event.target.value;
    const val = parseInt(event.key);*/
    if (isNaN(enteredKey) && enteredKey != ' ') {
      console.warn('rr');
      value.pop();
      this.reqQuantity.nativeElement.value = value.join('');
      //event.target.value = event.target.value.substr(0, targetVal.length - 1)
    } else {
      console.log('number', enteredKey, typeof enteredKey, value);
    }

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
