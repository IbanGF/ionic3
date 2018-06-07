import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content } from 'ionic-angular';


import { UserProfilePage } from '../user/user-profile/user-profile';
import { SpotsProvider } from '../../providers/spots/spots';

/**
 * Generated class for the SpotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spot',
  templateUrl: 'spot.html',
})
export class SpotPage {
  @ViewChild(Content) content: Content;
  spot: any;
  comments: any;
  showNavbar: boolean = false;
  sliderHeight: number = 0;
  userProfile: UserProfilePage;

  constructor(public navCtrl: NavController, public spotsProvider: SpotsProvider, public navParams: NavParams, public platform: Platform) {
    this.sliderHeight = this.platform.height() * 0.4 + 40;
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('spotSlug'));
    this.spotsProvider.getOneSpot(this.navParams.get('spotSlug')).then(data => {
      this.spot = data;
      // this.loadMap();
      console.log(this.spot);
      this.spotsProvider.getComments(this.spot._id).then(comments => {this.comments = comments; console.log(this.comments)});
    });
  }

}
