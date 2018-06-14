import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { SearchProvider } from '../../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html',
})
export class FiltersPage {

  selectedSecondaryTab: string;
  placesSearchQuery: any;
  price: any = { lower: 0, upper: 2000 };
  // engagements: Array<string> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public searchProvider: SearchProvider, public modalCtrl: ModalController) { }

  openModalHouseTypes(){
    const houseTypesModal = this.modalCtrl.create('HouseTypesPage');
    houseTypesModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltersPage');
    this.selectedSecondaryTab = this.searchProvider.getSelectedSecondaryTab();
    this.placesSearchQuery = this.searchProvider.getPlacesQuery();
  }

  segmentChanged() {
    this.searchProvider.setSelectedSecondaryTab(this.selectedSecondaryTab);
  }

  setPrice() {
    console.log('set price!')
    this.placesSearchQuery.price = { min: this.price.lower, max: this.price.upper };
  }

  saveFilters() {
    this.searchProvider.setPlacesQuery(this.placesSearchQuery);
    this.viewCtrl.dismiss();
    // if(this.placesSearchQuery.engagements.length) this.placesSearchQuery.engagements = this.engagements;
    // if(this.placesSearchQuery.price.lower || this.price.upper != 2000) this.placesSearchQuery.price = { min: this.price.lower, max: this.price.upper };
  }

  toggleEngagement(engagement) {
    let index = this.placesSearchQuery.engagements.indexOf(engagement);
    if (index == -1) this.placesSearchQuery.engagements.push(engagement);
    else this.placesSearchQuery.engagements.splice(index, 1);
    console.log(this.placesSearchQuery.engagements);
  }

}
