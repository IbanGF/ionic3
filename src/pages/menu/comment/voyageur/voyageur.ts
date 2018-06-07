import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-voyageur',
  templateUrl: 'voyageur.html',
})
export class VoyageurPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VoyageurPage');
  }

}
