import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
} from '@ionic-native/google-maps';

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform } from 'ionic-angular';

import { Items } from '../../providers/providers';
import { PlacesProvider } from '../../providers/places/places';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {

  @ViewChild(Content) content: Content;
  map: GoogleMap;
  showNavbar: boolean = false;
  sliderHeight: number = 0;
  place: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, public placesProvider: PlacesProvider, public platform: Platform) {
    this.sliderHeight = this.platform.height() * 0.4 + 40;
  }

  loadMap() {

    console.log('currentPlaces', this.place);

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.place.loc.coordinates[1],
          lng: this.place.loc.coordinates[0]
        },
        zoom: 18,
        tilt: 30
      }
    };

    // let element: HTMLElement = document.getElementById('map');
    this.map = GoogleMaps.create('placeMap', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
      });
    // Now you can use all methods safely.

  }

  ionViewDidLoad() {
    this.placesProvider.getOnePlace(this.navParams.get('placeSlug')).then(data => {
      this.place = data;
      this.loadMap();
      console.log(this.place);
    });
  }

  ionViewDidLeave() {
    this.place = {};
  }

}
