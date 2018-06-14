import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SearchProvider } from '../../../providers/search/search';

@IonicPage()
@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html',
})
export class FiltersPage {

  price: any = { lower: 0, upper: 2000 };
  engagements: Array<string> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public searchProvider: SearchProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltersPage');
  }

  saveFilters(){
    this.viewCtrl.dismiss();
    if(this.engagements.length) this.searchProvider.placesQuery.engagements = this.engagements;
    if(this.price.lower || this.price.upper != 2000) this.searchProvider.placesQuery.price = { min: this.price.lower, max: this.price.upper };
  }

  toggleEngagement(engagement){
    let index = this.engagements.indexOf(engagement);
    if(index == -1) this.engagements.push(engagement);
    else this.engagements.splice(index, 1);
  }

}
