import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Constants from '../../constants/constants';


@IonicPage()
@Component({
  selector: 'page-hobbies-select-multiple',
  templateUrl: 'hobbies-select-multiple.html',
})
export class HobbiesSelectMultiplePage {
  sports: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    console.log(this.sports)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HobbiesSelectMultiplePage');
  }
  initializeItems(){
    this.sports = Constants.SPORTS;
  };

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.sports = this.sports.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
