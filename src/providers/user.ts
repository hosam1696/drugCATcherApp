import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()

export class UserProvider {
    constructor(public http: Http) {

    }


    loginUser(userData) {

        return this.http.post('http://hager.000webhostapp.com/api/auth/login?email='+userData.email+'&password='+userData.password, JSON.stringify(userData)).map(res=>res.json());
    }
}