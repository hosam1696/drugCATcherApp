import { Http, URLSearchParams,Headers, RequestOptions } from '@angular/http';
import {Inject, Injectable} from '@angular/core';
@Injectable()

export class HomeProvider {
  constructor(@Inject('API_URL') private API_URL, private http: Http) {

  }


  getOffers(id) {
    return this.http.get(`${this.API_URL}home/${id}`).map(res=>res.json());
  }

}
