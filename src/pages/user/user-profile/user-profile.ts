import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../../providers/user/user';
import moment from 'moment';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  user: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: User) {}

  ionViewDidLoad() {
    this.userProvider.getOne(this.navParams.get('id')).then(data => {
      this.user = data;
      this.user.creation = moment(this.user.creation).format('MMM YYYY')
      console.log(this.user);
    });
  }

}
