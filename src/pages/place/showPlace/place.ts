// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   GoogleMapOptions,
// } from '@ionic-native/google-maps';

import { Component, ViewChild } from '@angular/core';
import { ModalController, App, IonicPage, NavController, NavParams, Content, Platform } from 'ionic-angular';

import { PlacesProvider, SpotsProvider } from '../../../providers/providers';
import { EquipementsPage } from './modals/equipements/equipements';

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html'
})
export class PlacePage {

  @ViewChild(Content) content: Content;
  // map: GoogleMap;
  showNavbar: boolean = false;
  sliderHeight: number = 0;
  place: any;
  placesNearBy: any;
  spotsNearBy: any;
  comments: any;

  constructor(public modalCtrl: ModalController, public appCtrl: App, public navCtrl: NavController, public navParams: NavParams, public spotsProvider: SpotsProvider,public placesProvider: PlacesProvider, public platform: Platform) {
    this.sliderHeight = this.platform.height() * 0.4 + 40;
  }

  loadMap() {

    console.log('currentPlaces', this.place);

    // let mapOptions: GoogleMapOptions = {
    //   camera: {
    //     target: {
    //       lat: this.place.loc.coordinates[1],
    //       lng: this.place.loc.coordinates[0]
    //     },
    //     zoom: 18,
    //     tilt: 30
    //   }
    // };

    // let element: HTMLElement = document.getElementById('map');
    // this.map = GoogleMaps.create('placeMap', mapOptions);

    // Wait the MAP_READY before using any methods.
    // this.map.one(GoogleMapsEvent.MAP_READY)
    //   .then(() => {
    //     console.log('Map is ready!');
    //   });
    // Now you can use all methods safely.

  }

  showUser(id) {
    this.appCtrl.getRootNav().push('UserProfilePage', { id: id });
  }

  equipementsModal() {
     let equipementsModalModal = this.modalCtrl.create("EquipementsPage");
     equipementsModalModal.present();
   }

  servicesModal() {
     let servicesModalModal = this.modalCtrl.create("ServicesPage");
     servicesModalModal.present();
   }

  reglementsModal() {
     let reglementsModalModal = this.modalCtrl.create("ReglementsPage");
     reglementsModalModal.present();
   }

   openPlace(place) {
     this.appCtrl.getRootNav().push('PlacePage', { placeSlug: place.slug });
   }

   openSpot(spot) {
     this.appCtrl.getRootNav().push('SpotPage', { spotSlug: spot.slug });
   }

  ionViewDidLoad() {
    this.placesProvider.getOnePlace(this.navParams.get('placeSlug'))
    .subscribe(data => {
      this.place = data;
      this.placesProvider.setPlace(data);

      this.placesProvider.getCommentsPlace(this.place._id)
      .subscribe(comments => this.comments = comments );

      this.placesProvider.getPlacesNearBy(this.place.loc.coordinates, 50000)
      .subscribe(placesNearBy => this.placesNearBy = placesNearBy);

      this.spotsProvider.getSpotsNearBy(this.place.loc.coordinates, 50000)
      .subscribe(spotsNearBy => this.spotsNearBy = spotsNearBy);
    });
  }

}