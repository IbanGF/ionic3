import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { UserData } from '../../models/userdata'

import { Api } from '../api/api';

@Injectable()
export class User {
  _user: any;
  guestComments: any;
  hostComments: any;
  userData: any;
  constructor(public api: Api, public http: HttpClient) { }
  
  getUserData() {
    return this.userData;
  }

  getMe() {
    let getMe = this.api.get('users/me');
    getMe.subscribe((res: any) => {
      this.userData = res;
    }, err => {
      console.log('non connecté');
    });
    return getMe;
  }

  setGuestComments(comments) {
    this.guestComments = comments;
  }

  getCurrentGuestComments() {
    return this.guestComments;
  }

  setHostComments(comments) {
    this.hostComments = comments;
  }

  getCurrentHostComments() {
    return this.hostComments;
  }

  getOne(id: any) {
    return this.api.get('users/' + id);
  }

  getGuestComments(id: any) {
    return this.api.get('booking/getGuestComments/' + id);
  }

  getHostComments(id: any) {
    return this.api.get('booking/getHostComments/' + id);
  }
}
