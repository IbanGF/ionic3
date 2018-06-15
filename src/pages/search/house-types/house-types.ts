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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public searchProvider: SearchProvider) {}

  initializeItems() {
    this.houseTypes = Constants.PLACESLISTS.HOUSETYPES;
  };

  getItems(ev) {
    this.initializeItems();
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.houseTypes = this.houseTypes.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  ionViewDidLoad() {
    this.placeQuery = this.searchProvider.getPlacesQuery();
    this.initializeItems();
  }

  selectHouseType(propertyType: string) {
    let index = this.placeQuery.propertyTypes.indexOf(propertyType);
    if (index == -1) {
      this.placeQuery.propertyTypes.push(propertyType);
    } else {
      this.placeQuery.propertyTypes.splice(index, 1);
    }
    console.log(this.placeQuery.propertyTypes);
  }

  saveHouseTypes() {
    this.searchProvider.setPlacesQuery(this.placeQuery);
    this.viewCtrl.dismiss();
  }

}
