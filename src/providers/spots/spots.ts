import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the SpotsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpotsProvider {

  constructor(public api: Api) { }

  getSpots() {
    return new Promise(resolve => {
      this.api.get('spots/getNewsest').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getComments(id) {
    return new Promise(resolve => {
      this.api.get('spots/getComments/' + id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getOneSpot(spotSlug: any) {
    return new Promise(resolve => {
      this.api.get('spots/' + spotSlug).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
