
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


  getSpotsInBounds(southwest: Array<number>, northeast: Array<number>, placesQuery?: any) {
    return this.api.post('spots/getSpotsInBounds/' + southwest + '/' + northeast, placesQuery);
  }

  getSpotsNearBy(center: Array<number>, maxDistance: number) {
    return this.api.get('spots/spotsNearBy/' + center + '/' + maxDistance);
  }

  getNewestSpots() {
    return this.api.get('spots/getNewsest');
  }

  getCommentsSpot(id) {
    return this.api.get('/spots/getComments/' + id);
  }

  getOneSpot(spotSlug: any) {
    return this.api.get('/spots/' + spotSlug);
  }

  getHobbyStats(hobbies) {
      return this.api.post('/spots/statsHobby', hobbies);
  }

}
