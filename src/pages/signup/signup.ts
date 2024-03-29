import { UserProvider } from './../../providers/user';
import { TermsModal } from './../modals/terms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { Storage} from '@ionic/storage';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {  IEnSignUpControls } from "../../app/config/appinterfaces";
import {AppProv} from '../../app/config/appprov';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {


  signupForm     : FormGroup;
  pageNumber     : number = 1;
  showLoader     : boolean = false;
  AllCountries   : Array<any>;
  getcallCode    : boolean = true;
  AllCallingCodes: Array<{name:string, country: string, callingCode: string|number}>;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userProvider: UserProvider,
              public appProv: AppProv,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              private storage: Storage
            ) {
    this.AllCountries = this.appProv.Countries;
    this.AllCallingCodes = this.appProv.countryCallingCode.sort();
    this.signupForm = this.formBuilder.group({
      country : ['20,Egypt', Validators.compose([Validators.required])],
      first_name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      last_name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      country_code: ['',Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]+')])],

      email: ['', Validators.compose([Validators.required,Validators.pattern('.*(.com)')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      InsurePassword: ['', Validators.compose([Validators.required, this.InsurePass])],
      agreeTerms: new FormControl(false, this.mustAgree)
    });

    console.log(this.signupForm.controls);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.signupForm.valueChanges.subscribe(s=>{
      console.log(s);
    });

    console.log(this.appProv.countryCallingCode);
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

      this.signupForm.get('country').setValue(this.signupForm.get('country').value.split(',')[1]);
      console.log('%c%s','font-size:30px;color:#2196f3','sign up form is valid');

      delete this.signupForm.value.agreeTerms;
      delete this.signupForm.value.InsurePassword;


      this.showLoader = true;
      console.log('form value',this.signupForm.value);
      this.userProvider
        .signUpUser(this.signupForm.value)
        .subscribe(({status ,data})=>{
          if (status == 'ok') {

            this.showToast('you have created new account successfully');

            this.storage             /// update stored user Id if present
              .get('LoginData')
              .then(loginData=>{
                loginData = JSON.parse(loginData);
                loginData.id = data.id;

                this.storage.set('LoginData', JSON.stringify(loginData));
              })
              .catch(noLoginDataErr=>{
                //TODO: call to get token from Database
                this.storage.set('LoginData', JSON.stringify({id: data.id, email: data.email}));
              })


            this.storage    // store data from sign up in storage
              .set('UserData', JSON.stringify(data))
              .then(data=>{
                console.log('data from storage resolve', JSON.parse(data));
                this.navigateToPage('ChooseaddorjoinPage');
              })
              .catch(err=>{
                console.log('userData encountered an error on saving to storage', err); // if error is present needs a fallback action
              })


          }
        }, err=>{
          this.showLoader = false;

          let error = err.json().error.message;
          console.warn(err.json(), error);

          let match = error.match(/\'+.+\'+/g)[0];

          if(match.match('users_email_unique') != null) {
              this.showToast('User Email must be unique! choose another one');
          } else if (match.match('users_phone_unique') != null) {
            this.showToast('User Phone must be unique! choose another one');
          }

        }, ()=> {
          this.showLoader = false;
        })


    } else {
      this.detectFormErrors(this.signupForm);
    }
  }


  backStep() {
    if (this.pageNumber === 1) {
      this.navCtrl.pop()
    } else {
      this.pageNumber = this.pageNumber - 1;
      this.getcallCode = true;
    }


  }

  private detectFormErrors(form) {

    console.log(form.controls);

    let formKeys = Object.keys(form.controls);

    console.log('Form value Keys', Object.keys(form.controls));

    //console.log('email error',form.get('email').errors, form.get('password').errors);
    for (let formKey of formKeys) {
      //console.log('form Key',formKey);

      if (form.get(formKey).getError('required')) {
        this.showToast('Fill '+ IEnSignUpControls[formKey] + ' please');
        break;
      }else if (form.get(formKey).getError('pattern')) {
        if(formKey == 'mobile') {
          this.showToast(IEnSignUpControls[formKey]+' must be in numbers')
        } else if (formKey == 'email') {
          this.showToast( IEnSignUpControls[formKey] + ' must be at form (example)@(example).com');
        }else {
          this.showToast('you must write  correct '+IEnSignUpControls[formKey]);
        }
        break;
      } else if (form.get(formKey).getError('minlength')) {
        if(formKey == 'mobile') {
          this.showToast(IEnSignUpControls[formKey]+' must be 10 numbers')
        } else {
          this.showToast(IEnSignUpControls[formKey]+' must be  '+ form.get(formKey).getError('minlength').requiredLength + ' characters at least');
        }

        break;
      }else if (form.get(formKey).getError('maxlength')) {
        if(formKey == 'mobile') {
          this.showToast(IEnSignUpControls[formKey]+' must be 10 numbers')
        } else {
          this.showToast(IEnSignUpControls[formKey]+' must be  '+ form.get(formKey).getError('maxlength').requiredLength);
        }

        break;
      }  else if (form.get(formKey).getError('email')) {
        this.showToast( IEnSignUpControls[formKey]+ ' must be at form [example]@[example].com');
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

  nextStep() {
    this.pageNumber = 2;
    this.signupForm.get('country_code').setValue(this.signupForm.get('country').value.split(',')[0]);
    setTimeout(()=>{
      this.getcallCode = false
    },0)
  }

  openTermsModal() {
    console.log('attempt to open modal')
    let modal = this.modalCtrl.create(TermsModal)

    modal.present();
  }
}
