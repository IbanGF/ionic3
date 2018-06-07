import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the AssurancesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-assurances',
  templateUrl: 'assurances.html',
})
export class AssurancesPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssurancesPage');
  }

}
