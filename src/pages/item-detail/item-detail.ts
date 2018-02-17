import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';
import { PlacesProvider } from '../../providers/places/places';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item = {};
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, public placesProvider: PlacesProvider) {
  }

  ionViewDidLoad() {
    this.placesProvider.getOnePlace(this.navParams.get('placeSlug')).then(data => {
      this.item = data;
      console.log(this.item);
    });
  }

  ionViewDidLeave() {
    this.item = {};
  }

}
