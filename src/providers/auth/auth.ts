import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { NativeStorage } from '@ionic-native/native-storage';
import moment from 'moment';


@Injectable()
export class AuthProvider {

  data: {};
  isLog: boolean;

  constructor(private api: Api, private http: HttpClient, private nativeStorage: NativeStorage) { }

  signIn(data: any, redirectUrl: any) {
    const url = '';
    return this.http.post('https://test.sportihome.com/api/users' + url, data);
  }

  login(email: string, password: string) {
    this.data = { email: email, password: password };
    return this.http.post<any>('https://test.sportihome.com/api/users/login', this.data)
      .map(user => {
        if (user && user.token) {
          this.isLog = true;
          this.nativeStorage.setItem('currentUser', { property: 'token', anotherProperty: JSON.stringify(user.token) })
            .then(
              () => console.log('Stored item!'),
              error => console.error('Error storing item', error)
            );
        }
        return user;
      });
  }

  // getTokenAndIsExpire() {
  //   this.nativeStorage.getItem('currentUser')
  //     .then(
  //       data => {
  //         if (data.token && data.token !== null && this.parseJwtandGetExpDate(data.token) < moment().unix()) {
  //           return this.isLog = true;
  //         }
  //         else {
  //           this.isLog = false;
  //         }
  //       },
  //       error => {
  //         this.isLog = false;
  //       }
  //     );
  // }

  isLoggedin() {
    return this.http.get('https://test.sportihome.com/api/users/loggedin')
      .subscribe(response => {
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
          this.nativeStorage.setItem('currentUser', { property: 'token', anotherProperty: JSON.stringify(user) })
            .then(
              () => console.log('Stored item!'),
              error => console.error('Error storing item', error)
            );
        }
        return user;
      })
  }

  logout() {
    this.nativeStorage.remove('currentUser')
      .then(
        data => console.log(data),
        error => console.log(error)
      );
    this.isLog = false;
    return this.isLog;
  }

  parseJwtandGetExpDate(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    const exDate = JSON.parse(window.atob(base64)).exp;
    return exDate;
  }

}
