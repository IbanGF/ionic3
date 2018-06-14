import {
  ILatLng
} from '@ionic-native/google-maps';

import { Component, OnInit, NgModule, ViewChild, Renderer2 } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ModalController, Select } from 'ionic-angular';

import { PlacesProvider, SpotsProvider, SearchProvider, User, AuthProvider } from '../../providers/providers';

import * as Constants from '../../constants/constants';
/**
 * Generated class for the ListSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-search',
  templateUrl: 'list-search.html',
})
export class ListSearchPage implements OnInit {

  @ViewChild('searchBar') searchBar;
  @ViewChild('sportSelect') sportSelect: Select;

  selectedSecondaryTab = 'places';
  spotsSearchQuery: any;
  placesSearchQuery: any;
  currentPlaces: any;
  totalPlacesCount: number = 0;
  currentSpots: any;
  totalSpotsCount: number = 0;
  bounds: any;
  formatted_address: string;
  sports: Array<any>;

  constructor(public authProvider: AuthProvider, public appCtrl: App, public navCtrl: NavController, public userProvider: User, public navParams: NavParams, public searchProvider: SearchProvider, public modalCtrl: ModalController, public placesProvider: PlacesProvider, public spotsProvider: SpotsProvider, private renderer: Renderer2) {
    this.sports = Constants.SPORTS;
  }

  presentCalendarModal() {
    const calendarModal = this.modalCtrl.create('CalendarSearchPage');
    calendarModal.onDidDismiss(data => {
      this.placesSearchQuery = this.searchProvider.getPlacesQuery();
      this.getPlacesInBounds();
    });
    calendarModal.present();
  }

  presentFiltersModal() {
    const filtersModal = this.modalCtrl.create('FiltersPage');
    filtersModal.present();
    filtersModal.onDidDismiss((data) => {
      this.selectedSecondaryTab = this.searchProvider.getSelectedSecondaryTab();
    });
  }

  presentSportsModal() {
    const sportsModal = this.modalCtrl.create('HobbiesSelectMultiplePage');
    sportsModal.onDidDismiss(data => {
      console.log(data);
      this.placesSearchQuery = this.searchProvider.getPlacesQuery();
      this.getPlacesInBounds();
    });
    sportsModal.present();
  }

  openMap() {
    // const mapModal = this.modalCtrl.create('SearchPage');
    // mapModal.present();
    // this.isModal = true;
    //
    // mapModal.onDidDismiss(() => {
    //   this.isModal = false;
    // });
    // this.appCtrl.getRootNav().push('SearchPage');

    this.navCtrl.push('SearchPage');
  }

  presentAutocompleteModal() {
    const autocompleteModal = this.modalCtrl.create('ModalGoogleAutocompletePage');
    autocompleteModal.present();

    autocompleteModal.onDidDismiss((data) => {
      if (!data) return;
      this.formatted_address = data.formatted_address;
      this.searchProvider.setAddress(this.formatted_address);
      this.bounds = {
        northeast: [data.geometry.viewport.getNorthEast().lng(), data.geometry.viewport.getNorthEast().lat()],
        southwest: [data.geometry.viewport.getSouthWest().lng(), data.geometry.viewport.getSouthWest().lat()]
      };
      this.relaunchSearch();
    });
  }

  relaunchSearch() {
    this.searchProvider.setBounds(this.bounds);
    this.placesSearchQuery.page = 1;
    this.spotsSearchQuery.page = 1;
    this.getPlacesInBounds();
    this.getSpotsInBounds();
  }

  getPlacesInBounds() {
    this.placesProvider.getPlacesInBounds(this.bounds.southwest, this.bounds.northeast, this.placesSearchQuery).subscribe((data: any) => {
      this.currentPlaces = data.places;
      this.totalPlacesCount = data.count;
    });
  }

  getSpotsInBounds() {
    this.spotsProvider.getSpotsInBounds(this.bounds.southwest, this.bounds.northeast, this.spotsSearchQuery).subscribe((data: any) => {
      this.currentSpots = this.currentSpots.concat(data.spots);
      this.totalSpotsCount = data.count;
    });
  }

  loadMorePlaces(infiniteScroll) {
    this.placesSearchQuery.page++;
    this.placesProvider.getPlacesInBounds(this.bounds.southwest, this.bounds.northeast, this.placesSearchQuery).subscribe((data: any) => {
      this.currentPlaces = this.currentPlaces.concat(data.places);
      infiniteScroll.complete();
    });
  }

  loadMoreSpots(infiniteScroll) {
    this.spotsSearchQuery.page++;
    this.spotsProvider.getSpotsInBounds(this.bounds.southwest, this.bounds.northeast, this.spotsSearchQuery).subscribe((data: any) => {
      this.currentSpots = this.currentSpots.concat(data.spots);
      infiniteScroll.complete();
    });
  }

  ngOnInit() {
    let input = this.searchBar.getElementRef().nativeElement.querySelector('input');
    this.renderer.setAttribute(input, 'disabled', 'true');
  }

  isFavoritePlace(place) {
    if (this.authProvider.getLogStatus() === true) {
      return this.userProvider.isFavoritePlace(place);
    }
    else {
      return false;
    }
  }

  segmentChanged() {
    this.searchProvider.setSelectedSecondaryTab(this.selectedSecondaryTab);
  }

  ionViewDidLoad() {
    this.bounds = this.searchProvider.getBounds();
    this.formatted_address = this.searchProvider.getAddress();
    this.placesSearchQuery = this.searchProvider.getPlacesQuery();
    console.log(this.placesSearchQuery);
    this.placesProvider.getPlacesInBounds(this.bounds.southwest, this.bounds.northeast, this.placesSearchQuery).subscribe((data: any) => {
      this.currentPlaces = data.places;
      this.totalPlacesCount = data.count;
      this.spotsSearchQuery = this.searchProvider.getSpotsQuery();
      this.spotsProvider.getSpotsInBounds(this.bounds.southwest, this.bounds.northeast, this.spotsSearchQuery).subscribe((data: any) => {
        this.currentSpots = data.spots;
        this.totalSpotsCount = data.count;
      });
    });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.selectedSecondaryTab = this.searchProvider.getSelectedSecondaryTab();
    if (this.bounds != this.searchProvider.getBounds()) {
      this.bounds = this.searchProvider.getBounds();
      this.formatted_address = this.searchProvider.getAddress();
      this.placesSearchQuery = this.searchProvider.getPlacesQuery();
      this.relaunchSearch();
    }
  }

}
