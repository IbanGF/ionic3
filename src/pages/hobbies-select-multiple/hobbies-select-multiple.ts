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
    this.sports = Constants.SPORTS;
    console.log(this.sports)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HobbiesSelectMultiplePage');
  }

}
