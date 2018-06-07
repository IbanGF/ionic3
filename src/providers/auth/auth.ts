import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthProvider {

  data: {};
  isLog: boolean;


  constructor(public api: Api, public http: HttpClient) { }

  login(email: string, password: string) {
    this.data = { email: email, password: password };
    return this.http.post<any>('https://test.sportihome.com/api/users/login', this.data)
      .map(user => {
        if (user && user.token) {
          this.isLog = true;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.parseJwt(user.token);
        }
        return user;
      });
  }

  isLoggedin() {
    return this.http.get('https://test.sportihome.com/api/users/loggedin')
      .map(response => {
        if (response === true) {
          this.isLog = true;
        }
        return true;
      }, err => {
        this.isLog = false;
        return false;
      })
  }

  getLogStatus() {
    return this.isLog;
  }

  loginFb(token) {
    return this.http.get('https://test.sportihome.com/api/' + 'facebook/token?access_token=' + token)
      .map(user => {
        if (user) {
          this.isLog = true;
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isLog = false;
    return this.isLog;
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    console.log(JSON.parse(window.atob(base64)));
  }

}
