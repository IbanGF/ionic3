import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { UserData } from '../../models/userdata'

import { Api } from '../api/api';

@Injectable()
export class User {
  userData: any;
  url: string;
  favSpots: Array<any>;
  favPlaces: Array<any>;
  favPlacesIds: Array<any>;
  favSpotsIds: Array<any>;
  constructor(public api: Api, public http: HttpClient) {
    this.url = this.api.getUrl();
    this.favPlacesIds = [];
    this.favSpotsIds = [];
  }

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

  getFavorites() {
    return this.api.get('users/favorites')
      .subscribe((res: any) => {
        if (res.favorites && res.favorites.places.length) {
          this.favPlaces = res.favorites.places;
          for (var i = 0; i < this.favPlaces.length; i++) {
            this.favPlacesIds.push(this.favPlaces[i]._id);
          }
        }
        if (res.favorites && res.favorites.spots.length) {
          this.favSpots = res.favorites.spots;
          for (var i = 0; i < this.favSpots.length; i++) {
            this.favSpotsIds.push(this.favSpots[i]._id);
          }
        }
        let data;
        return data = [this.favPlaces, this.favSpots];
      })
  }

  getFavoritesForUser() {
    return this.api.get('users/favorites')
      .map((res: any) => {
        if (res.favorites && res.favorites.places.length) {
          this.favPlaces = res.favorites.places;
          for (var i = 0; i < this.favPlaces.length; i++) {
            this.favPlacesIds.push(this.favPlaces[i]._id);
          }
        }
        if (res.favorites && res.favorites.spots.length) {
          this.favSpots = res.favorites.spots;
          for (var i = 0; i < this.favSpots.length; i++) {
            this.favSpotsIds.push(this.favSpots[i]._id);
          }
        }
        let data;
        return data = [this.favPlaces, this.favSpots];
      })
  }


  isFavoritePlace(placeId: string) {
    let fav = false;
    if (this.favPlacesIds) {
      for (var i = 0; i < this.favPlacesIds.length; i++) {
        if (placeId == this.favPlacesIds[i]) {
          return fav = true;
        }
      }
    }
    return fav;
  }

  getFavoriteSpotsArray() {
    return this.favSpots;
  }

  isFavoriteSpot(placeId: string) {
    let fav = false;
    if (this.favSpotsIds) {
      for (var i = 0; i < this.favSpotsIds.length; i++) {
        if (placeId == this.favSpotsIds[i]) {
          return fav = true;
        }
      }
    }
    return fav;
  }

  getFavoritePlaceArray() {
    return this.favPlaces;
  }
  getFavoriteSpotArray() {
    return this.favSpots;
  }
  addPlaceFavorite(placeId: any) {
    this.favPlacesIds.push(placeId);
    return this.api.put('users/favoritePlace/' + placeId);
  }

  removePlaceFavorite(placeId: any) {
    this.favPlacesIds = this.favPlacesIds.filter(e => e !== placeId);
    return this.api.delete('users/favoritePlace/' + placeId);
  }

  addSpotFavorite(placeId: any) {
    this.favSpotsIds.push(placeId);
    return this.api.put('users/favoriteSpot/' + placeId);
  }

  removeSpotFavorite(placeId: any) {
    this.favSpotsIds = this.favSpotsIds.filter(e => e !== placeId);
    return this.api.delete('users/favoriteSpot/' + placeId);
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
