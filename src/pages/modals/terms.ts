

import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";

@Component({
  template:`
    <ion-header>
      <ion-navbar color="primary">
        <ion-title>
          Terms
        </ion-title>

        <ion-buttons start>
          <button ion-button clear (click)="closeModal()">
            <ion-icon name="close"></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>
    </ion-header> 
    
    <ion-content padding-horizontal>
      <h4 text-center>Terms and conditions of the app</h4>
      <p text-center>terms and conditions will be here</p> 
    </ion-content>
  `,
  styles: [`
    .content {
      background: repeating-linear-gradient(45deg, #f8f8f8, #f8f8f8 1px, transparent 1px, transparent 30px), radial-gradient(circle at center center, #fff, #f6f6f6);
    }
  `]
})

export class TermsModal {

  constructor(params: NavParams, public viewCtrl:ViewController) {

  }

  closeModal() {
    this.viewCtrl.dismiss()
  }

}
