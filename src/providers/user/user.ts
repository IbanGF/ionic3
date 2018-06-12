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
  constructor(public api: Api, public http: HttpClient) {
    this.url = this.api.getUrl();
    this.favPlacesIds = [];
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

  getFavorites(){
    return this.api.get('users/favorites')
    .subscribe((res: any)=>{
      if(res.favorites && res.favorites.places.length){
        this.favPlaces = res.favorites.places;
        for(var i = 0; i< this.favPlaces.length; i++){
          this.favPlacesIds.push(this.favPlaces[i]._id);
        }
      }
      if(res.favorites && res.favorites.spots.length){
        this.favSpots = res.favorites.spots;
      }
      let data;
      return data = [this.favPlaces, this.favSpots];
    })
  }


  isFavoritePlace(placeId: string){
    let fav = false;
    if(this.favPlacesIds){
      for(var i = 0; i< this.favPlacesIds.length; i++){
        if(placeId == this.favPlacesIds[i]){
          return fav = true;
        }
      }
    }
    return fav;
  }

  getFavoritePlaceArray(){
    return this.favPlaces;
  }
  addPlaceFavorite(placeId: any){
    this.favPlacesIds.push(placeId);
    return this.api.put('users/favoritePlace/' + placeId);
  }

  removePlaceFavorite(placeId:any){
    this.favPlacesIds = this.favPlacesIds.filter(e => e !== placeId);
    return this.api.delete('users/favoritePlace/' + placeId);
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
