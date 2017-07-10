import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
     authToken:any;
     user:any;
     constructor (private _http: Http){}
     registerUser(user) {
         let headers = new Headers();
         headers.append('Content-Type','application/json');
         return this._http.post('users/register', user , {headers:headers})
             .map(res => res.json());    
     }
     authenticateUser(user) {
         let headers = new Headers();
         headers.append('Content-Type','application/json');
         return this._http.post('users/authenticate',user,{headers:headers})
            .map(res => res.json()); 
    }
    getProfile() {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization',this.authToken);
        headers.append('Content-Type','application/json');
        return this._http.get('users/profile',{headers:headers})
            .map(res => res.json());
    }
    storeUserData(token,user) {
        localStorage.setItem('token_id',token);
        localStorage.setItem('user',JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }
    loggedIn() {
      //  return tokenNotExpired(); not working 
      //customized
      this.loadToken();
      if(this.authToken){
        return true;
      }else {
        return false;
      }
    }
    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }
    loadToken() {
        const token = localStorage.getItem('token_id');
        this.authToken = token;
    }

 

    
}