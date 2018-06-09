import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { UserData } from '../../models/userdata'

import { Api } from '../api/api';

@Injectable()
export class User {
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

  getOne(id: any) {
    return this.api.get('users/' + id);
  }

  getGuestComments(id: any) {
    return this.api.get('booking/getGuestComments/' + id);
  }

  getHostComments(id: any) {
    return this.api.get('booking/getHostComments/' + id);
  }

  getUserPlaces(id: any) {
    return this.api.get('places/user/' + id);
  }

  getUserSpots(id: any) {
    return this.api.get('spots/user/' + id);
  }
}
