import { UserProvider } from './../../providers/user';
import { Component } from '@angular/core';
import {NavController, IonicPage, ToastController} from 'ionic-angular';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms"
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  showLoader: boolean = false;
  unDB: boolean = false;
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public userProvider: UserProvider
    ) {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(5),Validators.pattern('.*(.com)')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



  submitLoginUser() {
    this.unDB = false;
    console.log(this.loginForm);
    this.showLoader = true;
    if (this.loginForm.valid) {
      console.log('your form is valid');
      this.userProvider.loginUser(this.loginForm.value)
        .subscribe(res=>{
          
          
          console.log(res);
          if (res.status == 'ok') {
            this.navCtrl.setRoot('HomePage');
          } else {
            
          }

        },err => {
          let errors = JSON.parse(err['_body']).error.errors;
          if(errors) {
            let errKeys = Object.keys(errors);
            let errMsg: string;
            this.showLoader = false;
            console.warn(errors);
            for (let key of errKeys) {
                console.log('key',key);
                errMsg = errors[key][0];
            }
  
            this.showToast(errMsg);
          } else {
            this.unDB = true;
          }
          
          
        },() => {
          this.showLoader = false;
        })
      /*
      setTimeout(()=> {
        this.showLoader = false;
        this.navCtrl.setRoot('HomePage');
        //this.navCtrl.push('HomePage');
      }, 2000)
*/
    } else {
      this.showLoader = false;
      this.detectFormErrors(this.loginForm)
    }
  }


  detectFormErrors(form) {
    console.log(Object.keys(form.controls));
    let formKeys = Object.keys(form.controls);
    console.log('email error',form.get('email').errors, form.get('password').errors);
    for (let formKey of formKeys) {
      //console.log('form Key',formKey);

      if (form.get(formKey).getError('required')) {
        this.showToast('Fill the '+ formKey.toUpperCase()+ ' please');
        break;
      } else if (form.get(formKey).getError('minlength')) {
        this.showToast(formKey.toUpperCase()+' must be  '+ form.get(formKey).getError('minlength').requiredLength + ' characters at least');
        break;
      } else if (form.get(formKey).getError('pattern')) {
        this.showToast( formKey + ' must be at form (example)@(example).com');
        break;
      } else if (form.get(formKey).getError('email')) {
        this.showToast( formKey + ' must be at form (example)@(example).com');
        break;
      }

    }
  }
  navigateToPage(page) {
    //this.navCtrl.setRoot(page);
    //this.navCtrl.setRoot(page);

    this.navCtrl.push(page);
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
