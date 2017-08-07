import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupForm: FormGroup;
  pageNumber: number = 1;
  showLoader: boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController) {

    this.signupForm = this.formBuilder.group({
      country : ['TU', Validators.compose([Validators.required])],
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(8),Validators.pattern('[0-9]+')])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      InsurePassword: ['', Validators.compose([Validators.required, this.InsurePass])],
      agreeTerms: new FormControl(false, this.mustAgree)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  private mustAgree(input:FormControl): {[s:string]: boolean} {
    if (!input.root || !input.root.value) {
      return null
    }
    console.log('value', input.value);
    return (input.value === true) ? null : {notAgreed: true}
  }

  private InsurePass(input: FormControl): {[s:string]:boolean} {

    let insured = input.root.value.password == input.value;

    return insured ? null : {insurePass: true}

  }

  submitSignUpUser() {
    console.log(this.signupForm.value);
    if (this.signupForm.valid) {
      console.log('%c%s','font-size:30px;color:#2196f3','sign up form is valid');

      this.showLoader = true;

      this.showToast('successfully create new account');

      setTimeout(()=> {
        this.navigateToPage('ChooseaddorjoinPage');
      }, 2000)

    } else {
      this.detectFormErrors(this.signupForm);
    }
  }


  backStep() {
    if (this.pageNumber === 1) {
      this.navCtrl.pop()
    } else {
      this.pageNumber = this.pageNumber - 1;
    }


  }

  detectFormErrors(form) {

    console.log(this.signupForm.controls);
    console.log(Object.keys(form.controls));
    let formKeys = Object.keys(form.controls);
    //console.log('email error',form.get('email').errors, form.get('password').errors);
    for (let formKey of formKeys) {
      //console.log('form Key',formKey);

      if (form.get(formKey).getError('required')) {
        this.showToast('Fill '+ formKey.toUpperCase() + ' please');
        break;
      } else if (form.get(formKey).getError('minlength')) {
        this.showToast(formKey.toUpperCase()+' must be  '+ form.get(formKey).getError('minlength').requiredLength + ' characters at least');
        break;
      } else if (form.get(formKey).getError('pattern')) {
        if(formKey == 'mobile') {
          this.showToast('mobile must be in numbers')
        } else {
          this.showToast('you must write  correct ');
        }
        break;
      } else if (form.get(formKey).getError('email')) {
        this.showToast( formKey + ' must be at form [example]@[example].com');
        break;
      } else if (form.get(formKey).getError('notAgreed')) {
        this.showToast('you have to read the terms and conditions');
        break;
      } else if (form.get(formKey).getError('insurePass')) {
        this.showToast('passwords are not identical');
        break;
      }
  //mustAgree
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
