import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

import { Component, ViewChild } from '@angular/core';
import { App, IonicPage, ModalController, NavController, Platform, Slides } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items, PlacesProvider, SpotsProvider, SearchProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  @ViewChild(Slides) placesSlider: Slides;
  @ViewChild(Slides) spotsSlider: Slides;

  map: GoogleMap;
  currentPlacesMarkers = [];
  currentSpotsMarkers = [];
  selectedSecondaryTab = 'places';
  placesSearchQuery: any;
  currentPlaces: any;
  totalPlacesCount: number = 0;
  currentPlaceIndex = 0;
  currentSpots: any;
  currentSpotIndex: number = 0;
  drawerOptions: any;

  constructor(public appCtrl: App, public navCtrl: NavController, public platform: Platform, public googleMaps: GoogleMaps, public searchProvider: SearchProvider, public modalCtrl: ModalController, public placesProvider: PlacesProvider, public spotsProvider: SpotsProvider) {

    this.drawerOptions = {
      handleHeight: 20,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };
  }

  loadMap() {

    console.log('currentPlaces', this.currentPlaces);

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.currentPlaces[0].loc.coordinates[1],
          lng: this.currentPlaces[0].loc.coordinates[0]
        },
        zoom: 18,
        tilt: 30
      }
    };

    // let element: HTMLElement = document.getElementById('map');
    this.map = GoogleMaps.create('map', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        for (let i in this.currentPlaces) {
          this.map.addMarker({
            title: this.currentPlaces[i].name,
            icon: {
              url: 'https://test.sportihome.com/assets/search/nanoPlaceIcon.png',
              size: {
                width: 12,
                height: 18
              }
            },
            animation: 'DROP',
            position: {
              lat: this.currentPlaces[i].loc.coordinates[1],
              lng: this.currentPlaces[i].loc.coordinates[0]
            }
          }).then(marker => {
            this.currentPlacesMarkers.push(marker);
          })
        }
        for (let i in this.currentSpots) {
          this.map.addMarker({
            title: this.currentSpots[i].name,
            icon: {
              url: 'https://test.sportihome.com/assets/search/nanoSpotIcon.png',
              size: {
                width: 12,
                height: 18
              }
            },
            animation: 'DROP',
            position: {
              lat: this.currentSpots[i].loc.coordinates[1],
              lng: this.currentSpots[i].loc.coordinates[0]
            }
          }).then(marker => {
            this.currentSpotsMarkers.push(marker);
          })
        }
      });
    // Now you can use all methods safely.

  }

  placeSlideChanged() {
    // this.placesSlider.update();
    // if (this.currentPlaceIndex) this.currentPlacesMarkers[this.currentPlaceIndex].setAnimation();
    // console.log('Current index is', this.currentPlaceIndex || false);
    // this.currentPlaceIndex = this.placesSlider.getActiveIndex();
    console.log('Current index is', this.currentPlaceIndex);
    // this.currentPlacesMarkers[this.currentPlaceIndex].setAnimation('BOUNCE');
    // this.map.animateCamera({
    //   target: this.currentPlacesMarkers[this.currentPlaceIndex].get("position"),
    //   zoom: 10,
    //   duration: 500,
    //   padding: 0 // default = 20px
    // }).then(() => console.log('camera changed !'));
    if ((this.currentPlaces.length - this.currentPlaceIndex - 1) < 2 && (this.totalPlacesCount - this.currentPlaces.length) > 0) {
      this.placesSearchQuery.page++;
      console.log(this.placesSearchQuery);
      this.placesProvider.getPlaces([0.19748888593744596, 41.14594933613824], [6.536600214062446, 45.943861212538316], this.placesSearchQuery).then((data: any) => {
        console.log(data);
          this.currentPlaces = this.currentPlaces.concat(data.places);
        // for (let i in data.places) {
        //   this.map.addMarker({
        //     title: data.places[i].name,
        //     icon: {
        //       url: 'https://test.sportihome.com/assets/search/nanoPlaceIcon.png',
        //       size: {
        //         width: 12,
        //         height: 18
        //       }
        //     },
        //     animation: 'DROP',
        //     position: {
        //       lat: data.places[i].loc.coordinates[1],
        //       lng: data.places[i].loc.coordinates[0]
        //     }
        //   }).then(marker => {
        //     this.currentPlacesMarkers.push(marker);
        //   });
        // }
      });
    }
  }

  spotSlideChanged() {
    // this.spotsSlider.update();
    // if (this.currentSpotIndex) this.currentSpotsMarkers[this.currentSpotIndex].setAnimation();
    this.currentSpotIndex = this.spotsSlider.getActiveIndex();
    console.log('Current spot index is', this.currentSpotIndex);
    // this.currentSpotsMarkers[this.currentSpotIndex].setAnimation('BOUNCE');
    this.map.animateCamera({
      target: this.currentSpotsMarkers[this.currentSpotIndex].get("position"),
      zoom: 10,
      duration: 500,
      padding: 0 // default = 20px
    }).then(() => console.log('spot camera changed !'));
  }

  openPlace(place) {
    this.appCtrl.getRootNav().push('ItemDetailPage', {
      placeSlug: place.slug
    });
  }

  openSpot(spot) {
    this.appCtrl.getRootNav().push('ItemDetailPage', {
      spotSlug: spot.slug
    });
  }

  ionViewDidLoad() {
    this.placesSearchQuery = this.searchProvider.getPlacesQuery();
    this.placesProvider.getPlaces([0.19748888593744596, 41.14594933613824], [6.536600214062446, 45.943861212538316], this.placesSearchQuery).then((data: any) => {
      this.currentPlaces = data.places;
      this.totalPlacesCount = data.count;
      this.spotsProvider.getSpots().then(data => {
        this.currentSpots = data;
        this.platform.ready().then(() => {
          this.loadMap();
        });
      });
    });
  }

  // addPlace() {
  //   let addModal = this.modalCtrl.create('PlaceCreatePage');
  //   addModal.onDidDismiss(place => {
  //     if (place) {
  //       this.places.add(place);
  //     }
  //   })
  //   addModal.present();
  // }

  // deleteItem(place) {
  //   this.places.delete(place);
  // }

}
