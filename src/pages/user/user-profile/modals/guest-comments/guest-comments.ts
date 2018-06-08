import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../../../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-guest-comments',
  templateUrl: 'guest-comments.html',
})
export class GuestCommentsPage {

  guestComments: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public userProvider: User) {}

  closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.guestComments = this.userProvider.getCurrentGuestComments();
    console.log(this.guestComments);
  }

}
