import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-spots-user',
  templateUrl: 'spots-user.html',
})
export class SpotsUserPage {
  spots: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public userProvider: User) {}

  closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.spots = this.navParams.get('spots');
    console.log(this.spots)
  }

}
