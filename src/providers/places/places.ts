import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class PlacesProvider {
  place: any;
  constructor(public api: Api) { }

  getPlacesInBounds(southwest: Array<number>, northeast: Array<number>, placesQuery?: any) {
    return this.api.post('places/getPlacesInBounds/' + southwest + '/' + northeast, placesQuery);
  }

  getPlacesNearBy(center: Array<number>, maxDistance: number) {
    return this.api.get('places/placesNearBy/' + center + '/' + maxDistance);
  }

  getNewestPlaces() {
    return this.api.get('places/getNewests');
  }

  getOnePlace(placeSlug: any) {
    return this.api.get('places/' + placeSlug);
  }

  getCommentsPlace(id: any) {
    return this.api.get('places/getComments/' + id);
  }

  setPlace(place) {
    this.place = place;
  }

  getPlace() {
    return this.place;
  }

  getHobbyStats(hobbies) {
      return this.api.post('/places/statsHobby', hobbies);
  }
}
