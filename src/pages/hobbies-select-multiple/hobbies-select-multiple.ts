import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as Constants from '../../constants/constants';
import { SearchProvider } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-hobbies-select-multiple',
  templateUrl: 'hobbies-select-multiple.html',
})
export class HobbiesSelectMultiplePage {
  sports: Array<string>;
  selectedHobbies: Array<string> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public searchProvider: SearchProvider) { }

  initializeItems() {
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

  selectSport(sport: string) {
    let index = this.selectedHobbies.indexOf(sport);
    if (index == -1) {
      this.selectedHobbies.push(sport);
    } else {
      this.selectedHobbies.splice(index, 1);
    }
    console.log(this.selectedHobbies);
  }

  saveSports() {
    this.searchProvider.setSelectedHobbies(this.selectedHobbies);
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.selectedHobbies = this.searchProvider.getSelectedHobbies();
    this.initializeItems();
  }
}
