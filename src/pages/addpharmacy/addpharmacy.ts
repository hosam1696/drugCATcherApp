import { AppProv } from './../../app/config/appprov';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GappProvider } from "../../providers/gappproviders";
import { Geolocation } from "@ionic-native/geolocation";
import "rxjs/add/operator/mergeMap";
import { IuserLocData, IEnFormControls } from "../../app/config/appinterfaces";
import { Http } from "@angular/http";
import "rxjs/add/operator/pluck";


declare let google;
@IonicPage()
@Component({
  selector: 'page-addpharmacy',
  templateUrl: 'addpharmacy.html',
})
export class AddpharmacyPage {
  
  @ViewChild('map') mapElement: ElementRef;
  map              : any;
  markers          : any[] = [];
  AddPharmacyForm  : FormGroup;
  showLoader       : boolean = false;
  userIpData       : IuserLocData;
  AllCallingCodes  : any[];
  getcallCode      : boolean = false;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public mapsProvider: GappProvider,
    public gelocation: Geolocation,
    public appProv: AppProv,
    public http: Http
  ) {

    this.AllCallingCodes = this.appProv.countryCallingCode;
    console.log(this.AllCallingCodes);

    this.AddPharmacyForm = this.formBuilder.group({
      governorate: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      city: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      area: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      address: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      landmark: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      pharmacyname: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      countrycall: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')])],
      reg_num: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('[0-9]+')])],
      role: [0, Validators.compose([Validators.required])],
      personalid: ['', Validators.compose([Validators.required, , Validators.minLength(14), Validators.maxLength(14), Validators.pattern('[0-9]+')])],
      syndicate_num: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('[0-9]+')])],
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpharmacyPage');

    this.getLocation();

    this.AddPharmacyForm.valueChanges
      .subscribe(x => {
        console.log(x, x.role);
        if (x.role == 4 || x.role == 5) {
          
          console.log('i want to remove syndecate number');
          this.AddPharmacyForm.get('syndicate_num').clearValidators();
          
          this.AddPharmacyForm.controls.syndicate_num.setValidators(Validators.nullValidator);
          //x.syndicate_num.setValidators(null);

         // this.AddPharmacyForm.controls.syndicate_num.setValidators(null);
        }
        
      })

  }

  getLocation() {
    this.gelocation.getCurrentPosition().then(({ coords, timestamp }) => {
      const {latitude, longitude} = coords;
      console.log(coords, timestamp);
      this.loadMap(latitude, longitude);
      this.getAddress(latitude, longitude);
    }, err => {
      console.log(err);
      this.getUserLoc()
    });
  }

  getUserLoc() {
    this.mapsProvider
      .getUserIP()
      .flatMap(({ ip }) => {
        return this.mapsProvider.getUserLocayionInfoByIp(ip)
      })
      .subscribe((userData: IuserLocData) => {
        let latLng: any[] = userData.loc.split(',');
        console.log('%c%s', 'font-size:25px', 'User location Info');
        console.group();
        console.log(userData, latLng);
        this.loadMap(...latLng);
        this.userIpData = userData;
        this.userIpData.latitude = userData.loc.split(',')[0];
        this.userIpData.longitude = userData.loc.split(',')[1];
        this.AddPharmacyForm.get('governorate').setValue(this.userIpData.region);
        this.AddPharmacyForm.get('city').setValue(this.userIpData.city);

      }, err => {
        console.warn(err);
        console.warn('%c%s', 'font-size:25px', 'Error Getting user Location')
      })

  }

  submitForm() {
    console.log(this.AddPharmacyForm.value);

    if (this.AddPharmacyForm.valid) {
      console.log('%c%s', 'font-size:30px;color:#2196f3', 'sign up form is valid');
      this.showToast('you have added a pharmacy..')
      setTimeout(() => {
        //this.navCtrl.setRoot('HomePage');
        this.navCtrl.push('LoginPage');
      }, 1500)
    } else {
      this.detectFormErrors(this.AddPharmacyForm);
    }

  }

  loadMap(latitude = 31.20186325, longitude = 29.90578294) {

    console.log('latitude, longitude', latitude, longitude);

    let latLng = new google.maps.LatLng(latitude, longitude);

    let mapOptions = {
      center: latLng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,

    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    google.maps.event.addListener(this.map, 'click', (event) => {
      let {lat, lng} = event.latLng;
      console.log('set Marker Here + event latLng', event.latLng, lat(), lng());
      this.addMarker(event.latLng);
      this.getAddress(lat(), lng());
    });

    this.addMarker();

  }

  getAddress(latitude, longitude) {

    let geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyBL9-cIsQpwffcZ5NCHEuHilTG_7sEhSXg';
    this.http.get(geocodeUrl)
      .map(res => res.json())
      .pluck('results')
      .map(res=>[res[0]['address_components'],res[2]['address_components']])
      //.pluck('address_components')
      //.map(res=>res)
      .subscribe(
      result => {
        //[0].formatted_address
        let mapComp = result[0].map(c=>c.long_name);
        if(!isNaN(mapComp[mapComp.length - 1]))
          mapComp.pop();
        console.log('response from geocoding',result);

        let [area, governorate, country] = [mapComp[mapComp.length-3],mapComp[mapComp.length-2],mapComp[mapComp.length-1]];
        let city = isNaN(result[1][0].long_name)?result[1][0].long_name:result[1][1].long_name;

        let countryCall:any = (country)?this.appProv.countryCallingCode.find(c=>c.name == country):'20';
        console.log('country call' ,countryCall)
        this.AddPharmacyForm.get('governorate').setValue(governorate);
        this.AddPharmacyForm.get('city').setValue(city);
        this.AddPharmacyForm.get('area').setValue(area);
        this.AddPharmacyForm.get('countrycall').setValue(countryCall.callingCode);
        this.getcallCode = true;
        
      },
      err => {
        console.warn(err);
      });
  }

  detectFormErrors(form) {

    console.log(this.AddPharmacyForm.controls);
    console.log(Object.keys(form.controls));
    let formKeys = Object.keys(form.controls);
    //console.log('email error',form.get('email').errors, form.get('password').errors);
    for (let formKey of formKeys) {
      //console.log('form Key',formKey);

      if (form.get(formKey).getError('required')) {
        this.showToast('Fill ' + IEnFormControls[formKey] + ' please');
        break;
      } else if (form.get(formKey).getError('pattern')) {

        this.showToast(IEnFormControls[formKey] + ' must be in numbers');

        break;
      } else if (form.get(formKey).getError('minlength')) {
        if (formKey == 'mobile' || formKey == 'personalid') {
          this.showToast(IEnFormControls[formKey] + ' must be ' + form.get(formKey).getError('minlength').requiredLength + ' numbers')
        } else {
          this.showToast(IEnFormControls[formKey] + ' must be  ' + form.get(formKey).getError('minlength').requiredLength + ' characters at least');
        }

        break;
      } else if (form.get(formKey).getError('maxlength')) {
        if (formKey == 'mobile' || formKey == 'personalid') {
          this.showToast(IEnFormControls[formKey] + ' must be ' + form.get(formKey).getError('maxlength').requiredLength + ' numbers')
        } else {
          this.showToast(IEnFormControls[formKey] + ' must be  ' + form.get(formKey).getError('maxlength').requiredLength + ' characters at least');
        }

        break;
      } else if (form.get(formKey).getError('email')) {
        this.showToast(IEnFormControls[formKey] + ' must be at form [example]@[example].com');
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
  removeMarkers() {
    this.markers.forEach(map => {
      map.setMap(null);
    });
    this.markers = [];
  }

  addMarker(loc?: any) {
    this.removeMarkers();
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: (!loc) ? this.map.getCenter() : loc
    });
    /*if (loc) {
      console.log('new location of the client', loc, loc.lat(), loc.lng());
      this.setNewLoc(this.modalData, loc.lat(), loc.lng());
      this.getAddress(loc.lat(), loc.lng());
    }*/


    google.maps.event.addListener(marker, 'drag', (event) => {

      console.log(event)
    });
    let content = "موقعى";

    this.markers.push(marker);
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

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
