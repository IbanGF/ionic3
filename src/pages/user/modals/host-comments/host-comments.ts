import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-host-comments',
  templateUrl: 'host-comments.html',
})
export class HostCommentsPage {

  hostComments: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public userProvider: User) {}

  closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.hostComments = this.navParams.get('hostComments');
    console.log(this.hostComments);
  }

}
