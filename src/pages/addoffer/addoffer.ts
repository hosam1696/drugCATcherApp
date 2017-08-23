import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {OfferProvider} from "../../providers/offer.provider";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IEnAddOfferForm} from "../../app/config/appinterfaces";
import {Storage}  from "@ionic/storage";
/**
 * Generated class for the AddofferPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addoffer',
  templateUrl: 'addoffer.html',
})
export class AddofferPage {
  showLoader: boolean = false;
  pageData;
  dateNow =  new Date(Date.now()).toLocaleDateString();
  Drugs:any;
  userId: number;
  AddOfferForm: FormGroup;
  title:string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public offerProvider: OfferProvider,
              public fb: FormBuilder,
              public toastCtrl: ToastController,
              private storage: Storage
  ) {

    this.pageData = this.navParams.get('pageData');

    console.log(this.pageData);
    this.pageData&&this.changeTitle('Edit');
    this.AddOfferForm = this.fb.group({
      drug_id: [this.pageData?this.pageData.id:1, Validators.compose([Validators.required])],
      quantity: [this.pageData?this.pageData.quantity:null, Validators.compose([Validators.required])],
      expire_date: [this.pageData?this.unchangeDate(this.pageData.expire_date):'', Validators.compose([Validators.required])],
      using_date: [''],
      discount: [this.pageData?this.pageData.discount:null, Validators.compose([Validators.required])],
      price: [this.pageData?parseInt(this.pageData.price):null, Validators.compose([Validators.required])]

    });

  }

   ionViewDidLoad() {
    console.log('ionViewDidLoad AddofferPage');
    this.dateNow = new Date(Date.now()).toDateString();
    this.storage.get('LoginData')
      .then(loginData=>{
        loginData = JSON.parse(loginData);
        this.userId = loginData.id;
      });
    this.offerProvider.getDrugs()
      .subscribe(({status, data})=>{
        if (status == 200) {
          this.Drugs = data;
          console.log(this.Drugs);
          !this.pageData&&this.fillPriceField();
        }
      }, err=> {
        console.warn(err);
      });

    this.AddOfferForm.get('drug_id').valueChanges
      .subscribe(val=>{
        console.log(val);

        let drugPrice = parseInt(this.Drugs.find(drug=>drug.id == val).price);

        console.log(drugPrice);
        this.AddOfferForm.get('price').setValue(drugPrice);
      });


    this.AddOfferForm.get('expire_date')
      .valueChanges
      .subscribe(value=> {
        console.log(value);
      })
  }

  private  changeTitle(title) {
    this.title = title;
  }
  fillPriceField() {
    let drugPrice = parseInt(this.Drugs.find(drug=>drug.id == this.AddOfferForm.get('drug_id').value).price);

    console.log(drugPrice);
    this.AddOfferForm.get('price').setValue(drugPrice);
  }
  cancelOffer() {
    this.navCtrl.pop();
  }

  submitForm(form) {


    if(form.valid) {
      this.showLoader = true;

      if(this.title != 'Edit') {


      //this.AddOfferForm.get('expire_date').setValue(new Date(this.AddOfferForm.get('expire_date').value).toLocaleDateString());
      this.AddOfferForm.get('expire_date').setValue(this.changeDate(this.AddOfferForm.get('expire_date').value));
      console.log('form is valid');
      this.offerProvider
        .AddOffer(Object.assign({},form.value,{user_id: this.userId}))
        .subscribe(({status, data})=>{
          if(status === 200) {
            this.showToast('You have added Offer successfully');
            setTimeout(()=>{
              this.navCtrl.pop();
            }, 1500);
          }
        }, err=> {
          this.showLoader = false;
          console.warn(err);
        }, ()=> {
          this.showLoader =false
        })

      } else {


      }
    } else {
      this.detectFormErrors(this.AddOfferForm);
    }
  }

  detectFormErrors(form) {
    console.log(this.AddOfferForm.controls, form);
    console.log(Object.keys(form.controls));
    let formKeys = Object.keys(form.controls);
    //console.log('email error',form.get('email').errors, form.get('password').errors);
    for (let formKey of formKeys) {
      //console.log('form Key',formKey);

      if (form.get(formKey).getError('required')) {
        this.showToast('Fill '+ IEnAddOfferForm[formKey] + ' please');
        break;
      }else if (form.get(formKey).getError('pattern')) {
        if(formKey == 'mobile') {
          this.showToast(IEnAddOfferForm[formKey]+' must be in numbers')
        } else if (formKey == 'email') {
          this.showToast( IEnAddOfferForm[formKey] + ' must be at form (example)@(example).com');
        }else {
          this.showToast('you must write  correct '+IEnAddOfferForm[formKey]);
        }
        break;
      } else if (form.get(formKey).getError('minlength')) {
        if(formKey == 'mobile') {
          this.showToast(IEnAddOfferForm[formKey]+' must be 10 numbers')
        } else {
          this.showToast(IEnAddOfferForm[formKey]+' must be  '+ form.get(formKey).getError('minlength').requiredLength + ' characters at least');
        }

        break;
      }else if (form.get(formKey).getError('maxlength')) {
        if(formKey == 'mobile') {
          this.showToast(IEnAddOfferForm[formKey]+' must be 10 numbers')
        } else {
          this.showToast(IEnAddOfferForm[formKey]+' must be  '+ form.get(formKey).getError('maxlength').requiredLength);
        }

        break;
      }  else if (form.get(formKey).getError('email')) {
        this.showToast( IEnAddOfferForm[formKey]+ ' must be at form [example]@[example].com');
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

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  changeDate(date) {

    return date+'-01'
  }
  unchangeDate(date) {
    date = date.split('-');
    date = date.splice(2,1);
    return date.join();
  }
}
