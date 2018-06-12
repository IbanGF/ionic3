import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-favoriteplaces',
  templateUrl: 'favorite-places.html',
})
export class FavoritePlaces {
  places: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public userProvider: User) {}

  closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.places = this.navParams.get('places');
  }

}
