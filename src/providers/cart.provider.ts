import { Http, URLSearchParams,Headers, RequestOptions } from '@angular/http';
import {Inject, Injectable} from '@angular/core';
@Injectable()

export class CartProvider {
  constructor(@Inject('API_URL') private API_URL, private http: Http) {

  }

  getCartOffers(id) {
    //let urlSearchParams = new URLSearchParams();
    return this.http.get(`${this.API_URL}cart/${id}`).map(res=>res.json());
  }


}
