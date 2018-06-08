import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PlacesProvider } from '../../../../../providers/places/places';

/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  place: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public placesProvider: PlacesProvider) {}

  closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.place = this.placesProvider.getPlace();
  }

}
