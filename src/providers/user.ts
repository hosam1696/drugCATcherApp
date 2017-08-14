import { Http, URLSearchParams,Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()

export class UserProvider {
    constructor(public http: Http) {

    }

    private getPutHeaders(){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return new RequestOptions({
            headers: headers
            , withCredentials: true // optional when using windows auth
        });
    }
    loginUser(userData) {
        
        let urlSearchParams = new URLSearchParams();
        for (let key of Object.keys(userData)) {
            urlSearchParams.append(key, userData[key]);
        }

        return this.http.post('http://hager.000webhostapp.com/api/auth/login', urlSearchParams).map(res=>res.json());
    }
}