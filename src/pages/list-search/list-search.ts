import {
  ILatLng
} from '@ionic-native/google-maps';

import { Component, NgModule, ViewChild, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { PlacesProvider, SpotsProvider, SearchProvider , User} from '../../providers/providers';

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
export class ListSearchPage {

  @ViewChild('searchBar') searchBar;

  placesSearchQuery: any;
  currentPlaces: any;
  totalPlacesCount: number = 0;
  currentSpots: any;
  totalSpotsCount: number = 0;
  bounds: any;
  formatted_address: string;
  isModal: boolean = false;

  constructor(public navCtrl: NavController, public userProvider: User, public navParams: NavParams, public searchProvider: SearchProvider, public modalCtrl: ModalController, public placesProvider: PlacesProvider, public spotsProvider: SpotsProvider, private renderer: Renderer2) {
  }

  presentMapModal() {
    const mapModal = this.modalCtrl.create('SearchPage');
    mapModal.present();
    this.isModal = true;

    mapModal.onDidDismiss(() => {
      this.isModal = false;
    });
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
    this.getPlacesInBounds();
  }

  getPlacesInBounds() {
    this.placesProvider.getPlacesInBounds(this.bounds.southwest, this.bounds.northeast, this.placesSearchQuery).subscribe((data: any) => {
      this.currentPlaces = data.places;
      this.totalPlacesCount = data.count;
    });
  }

  loadMorePlaces(infiniteScroll) {
    this.placesSearchQuery.page++;
    this.placesProvider.getPlacesInBounds(this.bounds.southwest, this.bounds.northeast, this.placesSearchQuery).subscribe((data: any) => {
      this.currentPlaces = this.currentPlaces.concat(data.places);
      infiniteScroll.complete();
    });
  }

  ngOnInit() {
    let input = this.searchBar.getElementRef().nativeElement.querySelector('input');
    this.renderer.setAttribute(input, 'disabled', 'true');
  }
  isFavoritePlace(place){
    return this.userProvider.isFavoritePlace(place);
  }

  ionViewDidLoad() {
    this.bounds = this.searchProvider.getBounds();
    this.formatted_address = this.searchProvider.getAddress();
    this.placesSearchQuery = this.searchProvider.getPlacesQuery();
    this.placesProvider.getPlacesInBounds(this.bounds.southwest, this.bounds.northeast, this.placesSearchQuery).subscribe((data: any) => {
      this.currentPlaces = data.places;
      this.totalPlacesCount = data.count;
      this.spotsProvider.getSpots().subscribe((data: any) => {
        this.currentSpots = data;
        this.totalSpotsCount = data.count;
      });
    });
  }

}
