import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SearchProvider } from '../../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html',
})
export class FiltersPage {

  selectedSecondaryTab: string;
  placesQuery: any;
  // price: any = { min: 0, max: 2000 };
  // engagements: Array<string> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public searchProvider: SearchProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltersPage');
    this.selectedSecondaryTab = this.searchProvider.getSelectedSecondaryTab();
    this.placesQuery = this.searchProvider.getPlacesQuery();
  }

  segmentChanged() {
    this.searchProvider.setSelectedSecondaryTab(this.selectedSecondaryTab);
  }

  saveFilters() {
    this.searchProvider.setPlacesQuery(this.placesQuery);
    this.viewCtrl.dismiss();
    // if(this.placesQuery.engagements.length) this.placesQuery.engagements = this.engagements;
    // if(this.placesQuery.price.lower || this.price.upper != 2000) this.placesQuery.price = { min: this.price.lower, max: this.price.upper };
  }

  toggleEngagement(engagement) {
    let index = this.placesQuery.engagements.indexOf(engagement);
    if (index == -1) this.placesQuery.engagements.push(engagement);
    else this.placesQuery.engagements.splice(index, 1);
  }

}
