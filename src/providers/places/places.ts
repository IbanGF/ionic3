import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class PlacesProvider {

  constructor(public api: Api) { }

  getPlaces() {
    return this.api.get('places/getNewsest');
  }

}
