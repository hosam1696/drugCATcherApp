import { Http, URLSearchParams,Headers, RequestOptions } from '@angular/http';
import {Inject, Injectable} from '@angular/core';
@Injectable()

export class OfferProvider {
  constructor(@Inject('API_URL') private API_URL, private http: Http) {

  }

  getUserOffers(id) {
    return this.http.get(`${this.API_URL}getofferforuser/${id}`).map(res=>res.json());
  }

  getDrugs() {
    return this.http.get(this.API_URL+'getdrug').map(res=>res.json());
  }

  AddOffer(offerData) {
    let urlSearchParams = new URLSearchParams();
    for (let key of Object.keys(offerData)) {
      urlSearchParams.append(key, offerData[key]);
    }

    return this.http.post(this.API_URL+'addoffer', urlSearchParams).map(res=>res.json());
  }
  AddRequestOffer(requestData) {
    let urlSearchParams = new URLSearchParams();
    for (let key of Object.keys(requestData)) {
      urlSearchParams.append(key, requestData[key]);
    }

    return this.http.post(this.API_URL+'addrequest',urlSearchParams)
  }
  DeleteOffer(id) {

    return this.http.delete(this.API_URL+'deleteoffer/'+id).map(res=>res.json());
  }

  getPendingRequests(id) {
    return this.http.get(this.API_URL+'pendingrequest/'+id).map(res=>res.json());
  }
  getPendingRequestsPromise(id) {
    return this.http.get(this.API_URL+'pendingrequest/'+id).map(res=>res.json()).toPromise();
  }
}
