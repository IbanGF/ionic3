import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as Constants from '../../constants/constants';


@IonicPage()
@Component({
  selector: 'page-hobbies-select-multiple',
  templateUrl: 'hobbies-select-multiple.html',
})
export class HobbiesSelectMultiplePage {
  sports: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  initializeItems(){
    this.sports = Constants.SPORTS;
  };

  getItems(ev) {
    this.initializeItems();
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.sports = this.sports.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  saveSports() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.initializeItems();
  }
}
