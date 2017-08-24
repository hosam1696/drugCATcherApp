import { Http, URLSearchParams,Headers, RequestOptions } from '@angular/http';
import { Injectable,Inject } from '@angular/core';
@Injectable()

export class UserProvider {
    constructor(@Inject('API_URL') private API_URL,public http: Http) {

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

        return this.http.post(this.API_URL+'auth/login', urlSearchParams).map(res=>res.json());
    }



    signUpUser(userData) {

        let urlSearchParams = new URLSearchParams();
        for (let key of Object.keys(userData)) {
            urlSearchParams.append(key, userData[key]);
        }

        return this.http.post(this.API_URL+'auth/signup', urlSearchParams).map(res=>res.json());
    }


    AddPharmacy(pharmacyData) {

        let urlSearchParams = new URLSearchParams();
        for (let key of Object.keys(pharmacyData)) {
            urlSearchParams.append(key, pharmacyData[key]);
        }

        return this.http.post(this.API_URL+'addpharmacy', urlSearchParams).map(res=>res.json());
    }


    AddPersonalId(id, personal_id, syndicate_id_number) {

        console.log('data will be sent to add personal id', id, personal_id, syndicate_id_number);
      let urlSearchParams = new URLSearchParams();
      return this.http.post(this.API_URL+'addpersonalid/'+id+'/'+personal_id+'/'+syndicate_id_number,urlSearchParams).map(res=>res.json());
    }

    AddRole(id, role,pharmacy_id) {
        console.log('data will be sent to add Role', id, role, pharmacy_id);
      let urlSearchParams = new URLSearchParams();
      return this.http.post(this.API_URL+'addrole/'+id+'/'+role+'/'+pharmacy_id,urlSearchParams).map(res=>res.json());
    }
}
