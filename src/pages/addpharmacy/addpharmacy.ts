import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GappProvider} from "../../providers/gappproviders";
import {Geolocation} from "@ionic-native/geolocation";
import "rxjs/add/operator/mergeMap";
import {IuserLocData} from "../../app/config/appinterfaces";
import {Http} from "@angular/http";
import "rxjs/add/operator/pluck";

/**
 * Generated class for the AddpharmacyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare let google;
@IonicPage()
@Component({
  selector: 'page-addpharmacy',
  templateUrl: 'addpharmacy.html',
})
export class AddpharmacyPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  AddPharmacyForm: FormGroup;
  showLoader: boolean = false;
  userIpData: IuserLocData;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public mapsProvider: GappProvider,
              public gelocation: Geolocation,
              public http: Http
              ) {
    this.AddPharmacyForm = this.formBuilder.group({
      governorate: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      city: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      area: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      address: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      landmark: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(8),Validators.pattern('[0-9]+')])],
      pharmacyname: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      role: [0, Validators.compose([Validators.required])],
      personalid: ['', Validators.compose([Validators.required, Validators.minLength(12),Validators.pattern('[0-9]+')])],
      reg_num: ['', Validators.compose([Validators.required, Validators.minLength(4),Validators.pattern('[0-9]+')])],
      syndicate_num: ['', Validators.compose([Validators.required, Validators.minLength(4),Validators.pattern('[0-9]+')])],
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpharmacyPage');

    this.getLocation();

  }

  getLocation() {
    this.gelocation.getCurrentPosition().then(({coords, timestamp})=> {
      console.log(coords, timestamp);
      this.loadMap(coords.latitude, coords.longitude);
      this.getAddress(coords.latitude, coords.longitude);
    },err=> {
      console.log(err);
      this.getUserLoc()
    });
  }

  getUserLoc() {
    this.mapsProvider.getUserIP().flatMap(({ip})=>{
      return this.mapsProvider.getUserLocayionInfoByIp(ip)})
      .subscribe((userData:IuserLocData)=>{
        let latLng:any[] = userData.loc.split(',');
        console.log('%c%s','font-size:25px', 'User location Info' );
        console.group();
        console.log(userData, latLng);
        this.loadMap(...latLng);
        this.userIpData = userData;
        this.userIpData.latitude = userData.loc.split(',')[0];
        this.userIpData.longitude = userData.loc.split(',')[0];
        this.AddPharmacyForm.get('governorate').setValue(this.userIpData.region);
        this.AddPharmacyForm.get('city').setValue(this.userIpData.city);

      },err=>{
        console.warn(err);
        console.warn('%c%s', 'font-size:25px', 'Error Getting user Location')
      })

  }

  submitForm() {
    console.log(this.AddPharmacyForm.value);

    if (this.AddPharmacyForm.valid) {
      console.log('%c%s','font-size:30px;color:#2196f3','sign up form is valid');
    } else {
      this.detectFormErrors(this.AddPharmacyForm);
    }

  }

  loadMap(latitude = 31.20186325, longitude =29.90578294) {

    //30.078462054468716,30.078462054468716
    /*console.log('load map with latlng', latitude, longitude);
    if (!latitude && !longitude) {
      [latitude, longitude] = [(this.userLocal.latitude) ? this.userLocal.latitude : this.modalData.latitude, (this.userLocal.longitude) ? this.userLocal.longitude : this.modalData.longitude];
    }*/
    console.log('latitude, longitude', latitude, longitude);

    let latLng = new google.maps.LatLng(latitude, longitude);

    let mapOptions = {
      center: latLng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,

    };
    //this.loader.dismiss();
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

 /*
    let input = document.getElementById('pac-input');
    let searchBox = new google.maps.places.SearchBox(input);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    this.map.addListener('bounds_changed', function () {
      //searchBox.setBounds(this.map.getBounds());
    });
    searchBox.addListener('places_changed',  ()=> {
      let places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      this.removeMarkers();

      // For each place, get the icon, name and location.
      let bounds = new google.maps.LatLngBounds();
      places.forEach( (place)=> {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }


        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    }); */


    google.maps.event.addListener(this.map,'click', (event) => {
      console.log('set maker here');
      console.log('event latLng', event.latLng, event.latLng.lat(), event.latLng.lng());
      this.addMarker(event.latLng);
    });

    this.addMarker();


  }

  getAddress(latitude, longitude) {

    let geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyBL9-cIsQpwffcZ5NCHEuHilTG_7sEhSXg';
    this.http.get(geocodeUrl)
      .map(res => res.json())
      .pluck('results')
      .subscribe(
        result => {
          //[0].formatted_address
          console.log('response from geocoding', result[2].formatted_address);
          let [city, governorate, country] = result[2].formatted_address.split(',');
          let [area] = result[1].formatted_address.split(',');

          this.AddPharmacyForm.get('governorate').setValue(governorate);
          this.AddPharmacyForm.get('city').setValue(city);
          this.AddPharmacyForm.get('area').setValue(area);

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
        this.showToast('Fill '+ formKey.toUpperCase() + ' please');
        break;
      } else if (form.get(formKey).getError('minlength')) {
        this.showToast(formKey.toUpperCase()+' must be  '+ form.get(formKey).getError('minlength').requiredLength + ' characters at least');
        break;
      } else if (form.get(formKey).getError('pattern')) {

        this.showToast(formKey+' must be in numbers');

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
  removeMarkers() {
    this.markers.forEach(map => {
      map.setMap(null);
    });
    this.markers = [];
  }

  addMarker(loc?:any) {
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
