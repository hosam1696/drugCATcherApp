import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GappprovidersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GappProvider {

  constructor(public http: Http) {
    console.log('Hello GappprovidersProvider Provider');
  }

  getUserIP() {
    return this.http.get('http://ipv4.myexternalip.com/json').map(res=>res.json());
  }

  getUserLocayionInfoByIp(ip) {
    return (ip) ? this.http.get('http://ipinfo.io/' + ip).map(res=>res.json()) : null;
  }

}
