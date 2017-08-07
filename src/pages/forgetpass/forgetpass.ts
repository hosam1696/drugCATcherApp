import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the ForgetpassPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forgetpass',
  templateUrl: 'forgetpass.html',
})
export class ForgetpassPage {
  ForgetPass: FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder
              ) {
    this.ForgetPass = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])]
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpassPage');
  }

  submitForgetPass() {
    console.log(this.ForgetPass.controls);
  }

}
