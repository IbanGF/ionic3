import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  VisibleRegion,
  ILatLng,
  LatLngBounds,
  // CameraPosition,
  // MarkerOptions,
  // Marker
} from '@ionic-native/google-maps';

import { Component, ViewChild, NgZone, Renderer2 } from '@angular/core';
import { App, IonicPage, ModalController, NavController, Platform, Slides, ViewController } from 'ionic-angular';

// import { Item } from '../../models/item';
// import { ModalGoogleAutocomplete } from '../modal-google-autocomplete';
import { PlacesProvider, SpotsProvider, SearchProvider } from '../../providers/providers';

@IonicPage({ segment: 'map' })
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  @ViewChild(Slides) placesSlider: Slides;
  @ViewChild(Slides) spotsSlider: Slides;
  @ViewChild('searchBar') searchBar;

  map: GoogleMap;
  currentPlacesMarkers = [];
  currentSpotsMarkers = [];
  selectedSecondaryTab = 'places';
  placesSearchQuery: any;
  currentPlaces: any;
  totalPlacesCount: number = 0;
  currentPlaceIndex: number = 0;
  bounds: any;
  formatted_address: string;
  // prevPlaceIndex: number = 0;
  currentSpots: any;
  currentSpotIndex: number = 0;
  showRelaunch: boolean = false;


  constructor(public appCtrl: App, public navCtrl: NavController, private view: ViewController, public platform: Platform, public googleMaps: GoogleMaps, public searchProvider: SearchProvider, public modalCtrl: ModalController, public placesProvider: PlacesProvider, public spotsProvider: SpotsProvider, private zone: NgZone, private renderer: Renderer2) {
  }

  closeMapModal() {
    this.view.dismiss();
  }

  presentAutocompleteModal() {
    const autocompleteModal = this.modalCtrl.create('ModalGoogleAutocompletePage');
    autocompleteModal.present();

    autocompleteModal.onDidDismiss((data) => {
      if (!data) return;
      this.formatted_address = data.formatted_address;
      this.searchProvider.setAddress(this.formatted_address);
      let northeast: ILatLng = {
        lat: data.geometry.viewport.getNorthEast().lat(),
        lng: data.geometry.viewport.getNorthEast().lng()
      };
      let southwest: ILatLng = {
        lat: data.geometry.viewport.getSouthWest().lat(),
        lng: data.geometry.viewport.getSouthWest().lng()
      };
      let bounds: LatLngBounds = new LatLngBounds([northeast, southwest]);
      this.map.animateCamera({ 'target': bounds }).then(() => {
        this.relaunchSearch();
      });
    });
  }

  loadMap() {

    console.log('currentPlaces', this.currentPlaces);

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.currentPlaces[0].loc.coordinates[1],
          lng: this.currentPlaces[0].loc.coordinates[0]
        },
        zoom: 15,
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
            icon: i != '0' ? {
              url: 'https://test.sportihome.com/assets/search/nanoPlaceIcon.png',
              size: {
                width: 12,
                height: 18
              }
            } : {
                url: 'https://sportihome.com/assets/search/' + this.currentPlaces[i].home.propertyType + '.png',
                size: {
                  width: 35,
                  height: 42
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

        this.map.on(GoogleMapsEvent.MAP_DRAG_END).subscribe(() => {
          this.zone.run(() => {
            this.showRelaunch = true;
          });
          console.log('dragged');
          console.log('======> this.showRelaunch ', this.showRelaunch);
          // let visibleRegion: VisibleRegion = this.map.getVisibleRegion();
          // console.log(visibleRegion.northeast.toString());
          // console.log(visibleRegion.southwest.toString());
        });
      });
    // Now you can use all methods safely.

  }

  relaunchSearch() {
    let visibleRegion: VisibleRegion = this.map.getVisibleRegion();
    this.bounds.southwest = [visibleRegion.southwest.lng, visibleRegion.southwest.lat];
    this.bounds.northeast = [visibleRegion.northeast.lng, visibleRegion.northeast.lat];
    this.searchProvider.setBounds(this.bounds);
    this.placesSearchQuery.page = 1;
    for (let i in this.currentPlacesMarkers) {
      this.currentPlacesMarkers[i].remove();
    }
    this.getPlacesInBounds();
  }

  getPlacesInBounds() {
    this.placesProvider.getPlacesInBounds(this.bounds.southwest, this.bounds.northeast, this.placesSearchQuery)
    .subscribe((data: any) => {
      this.currentPlaces = data.places;
      this.totalPlacesCount = data.count;
      this.placesSlider.update();
      this.placesSlider.slideTo(0);
      // this.prevPlaceIndex = 0;
      this.currentPlacesMarkers = [];
      for (let i in this.currentPlaces) {
        this.map.addMarker({
          title: this.currentPlaces[i].name,
          icon: i != '0' ? {
            url: 'https://test.sportihome.com/assets/search/nanoPlaceIcon.png',
            size: {
              width: 12,
              height: 18
            }
          } : {
              url: 'https://sportihome.com/assets/search/' + this.currentPlaces[i].home.propertyType + '.png',
              size: {
                width: 35,
                height: 42
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
    });
  }

  placeSlideChanged() {
    this.showRelaunch = false;
    // this.currentPlacesMarkers[this.currentPlaceIndex].setZIndex(10000 + this.currentPlaceIndex);
    // if (this.currentPlaceIndex) this.currentPlacesMarkers[this.currentPlaceIndex].setAnimation();
    this.currentPlacesMarkers[this.placesSlider.getPreviousIndex()].setIcon({
      url: 'https://test.sportihome.com/assets/search/nanoPlaceIcon.png',
      size: {
        width: 12,
        height: 18
      }
    });
    this.currentPlaceIndex = this.placesSlider.getActiveIndex();
    this.currentPlacesMarkers[this.currentPlaceIndex].setIcon({
      url: 'https://sportihome.com/assets/search/' + this.currentPlaces[this.currentPlaceIndex].home.propertyType + '.png',
      size: {
        width: 35,
        height: 42
      }
    })
    // this.prevPlaceIndex = this.currentPlaceIndex;
    // this.currentPlacesMarkers[this.currentPlaceIndex].setAnimation('BOUNCE');
    this.map.animateCamera({
      target: this.currentPlacesMarkers[this.currentPlaceIndex].get("position"),
      zoom: 15,
      duration: 500,
      padding: 0
    });
    if ((this.currentPlaces.length - this.currentPlaceIndex - 1) < 2 && (this.totalPlacesCount - this.currentPlaces.length) > 0) {
      this.placesSearchQuery.page++;
      this.placesProvider.getPlacesInBounds(this.bounds.southwest, this.bounds.northeast, this.placesSearchQuery)
      .subscribe((data: any) => {
        this.currentPlaces = this.currentPlaces.concat(data.places);
        for (let i in data.places) {
          this.map.addMarker({
            title: data.places[i].name,
            icon: {
              url: 'https://test.sportihome.com/assets/search/nanoPlaceIcon.png',
              size: {
                width: 12,
                height: 18
              }
            },
            animation: 'DROP',
            position: {
              lat: data.places[i].loc.coordinates[1],
              lng: data.places[i].loc.coordinates[0]
            }
          }).then(marker => {
            this.currentPlacesMarkers.push(marker);
          });
        }
        this.placesSlider.update();
      });
    }
  }

  spotSlideChanged() {
    // if (this.currentSpotIndex) this.currentSpotsMarkers[this.currentSpotIndex].setZIndex();
    this.currentSpotIndex = this.spotsSlider.getActiveIndex();
    this.map.animateCamera({
      target: this.currentSpotsMarkers[this.currentSpotIndex].get("position"),
      zoom: 15,
      duration: 500,
      padding: 0 // default = 20px
    }).then(() => console.log('spot camera changed !'));
    this.spotsSlider.update();
  }

  ionViewDidLoad() {
    console.log('map ionViewDidLoad')
    this.bounds = this.searchProvider.getBounds();
    this.formatted_address = this.searchProvider.getAddress();
    this.placesSearchQuery = this.searchProvider.getPlacesQuery();
    this.placesProvider.getPlacesInBounds(this.bounds.southwest, this.bounds.northeast, this.placesSearchQuery)
    .subscribe((data: any) => {
      this.currentPlaces = data.places;
      this.totalPlacesCount = data.count;
      this.spotsProvider.getSpots().subscribe((data: any) => {
        this.currentSpots = data;
        this.platform.ready().then(() => {
          this.loadMap();
        });
      });
    });
  }



  // panEvent() {
  //   console.log('panned!')
  // }

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
