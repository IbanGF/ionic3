import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as Constants from '../../../constants/constants';
import { SearchProvider} from '../../../providers/search/search';

@IonicPage()
@Component({
  selector: 'page-house-types',
  templateUrl: 'house-types.html',
})

export class HouseTypesPage {

  houseTypes: Array<string>;
  placeQuery: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public searchProvider: SearchProvider) {
    this.houseTypes = Constants.PLACESLISTS.HOUSETYPES;
    this.placeQuery = this.searchProvider.getPlacesQuery();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HouseTypesPage');
  }


  saveHouseTypes(){
    this.searchProvider.setPlacesQuery(this.placeQuery);
    this.viewCtrl.dismiss();
  }

}
