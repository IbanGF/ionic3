import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class PlacesProvider {
    place : any;
  constructor(public api: Api) { }

    getPlacesInBounds(southwest: Array<number>, northeast: Array<number>, placesQuery?: any) {
      return new Promise(resolve => {
        this.api.post('places/getPlacesInBounds/' + southwest + '/' + northeast, placesQuery).subscribe((data: any) => {
          resolve({count: data.count, places: data.places});
        });
      });
    }

    getNewestPlaces() {
      return new Promise(resolve => {
        this.api.get('places/getNewests').subscribe(data => {
          resolve(data);
        });
      });
    }

    getOnePlace(placeSlug: any) {
      return new Promise(resolve => {
        this.api.get('places/' + placeSlug).subscribe(data => {
          resolve(data);
        });
      });
    }

    getCommentsPlace(id: any) {
      return new Promise(resolve => {
        this.api.get('places/getComments/' + id).subscribe(data => {
          resolve(data);
        });
      });
    }

    setPlace(place) {
      this.place = place;
    }

    getPlace() {
      return this.place;
    }

  // getUsers() {
  //   return new Promise(resolve => {
  //     this.http.get(this.apiUrl + '/users').subscribe(data => {
  //       resolve(data);
  //     }, err => {
  //       console.log(err);
  //     });
  //   });
  // }

}
