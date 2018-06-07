import { Component, ViewChild } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform, Content } from 'ionic-angular';

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

  constructor(public appCtrl: App, public navCtrl: NavController, public spotsProvider: SpotsProvider, public navParams: NavParams, public platform: Platform) {
    this.sliderHeight = this.platform.height() * 0.4 + 40;
  }

  showUser(id) {
    this.appCtrl.getRootNav().push('UserProfilePage', { id: id });
  }

  ionViewDidLoad() {
    this.spotsProvider.getOneSpot(this.navParams.get('spotSlug')).then(data => {
      this.spot = data;
      // this.loadMap();
      this.spotsProvider.getComments(this.spot._id).then(comments => {this.comments = comments; console.log(this.comments)});
    });
  }

}
