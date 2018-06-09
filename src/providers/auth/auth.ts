import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { IonicStorageModule, Storage } from '@ionic/storage';
import moment from 'moment';
import { User } from '../../providers/user/user'

export interface SignIn {
  email: string;
  password: string;
}

@Injectable()
export class AuthProvider {

  data: SignIn;
  isLog: boolean;

  constructor(private api: Api, private http: HttpClient, private storage: Storage, private userProvider: User) { }

  signIn(data: any, redirectUrl: any) {
    const url = '';
    return this.api.post('users' + url, data);
  }

  login(email: string, password: string) {
    this.data = { email: email, password: password };
    return this.api.post('users/login', this.data)
      .map((user: any) => {
        if (user) {
          this.isLog = true;
          this.storage.set('currentUser', JSON.stringify(user.token))
            .then(
              () => {
                this.userProvider.getMe();
                this.userProvider.getFavorites();
              },
              error => console.error('Error storing item', error)
            );
        }
        return user;
      });
  }

  isLoggedin() {
    return this.api.get('users/loggedin')
      .subscribe((response:any) => {
        if (response === true) {
          this.isLog = true;
          this.userProvider.getMe();
          this.userProvider.getFavorites();
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
    return this.api.get('facebook/token?access_token=' + token)
      .map(user => {
        if (user) {
          this.isLog = true;
          this.storage.set('currentUser', JSON.stringify(user))
            .then(
              () => {
                this.userProvider.getMe();
                this.userProvider.getFavorites();
              },
              error => console.error('Error storing item', error)
            );
        }
        return user;
      })
  }

  logout() {
    this.storage.remove('currentUser')
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
