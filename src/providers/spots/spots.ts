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
    return this.api.get('spots/getNewsest');
  }

  getSpotsNearBy(center: Array<number>, maxDistance: number) {
    return this.api.get('/api/spots/spotsNearBy/' + center + '/' + maxDistance);
  }

  getComments(id) {
    return this.api.get('spots/getComments/' + id);
  }

  getOneSpot(spotSlug: any) {
    return this.api.get('spots/' + spotSlug);
  }

}
