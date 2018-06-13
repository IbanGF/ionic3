import { Component, ViewChild, NgZone } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform, Content } from 'ionic-angular';

import { SpotsProvider, PlacesProvider } from '../../../providers/providers';

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
  spotsNearBy: any;
  placesNearBy: any;
  showNavbar: boolean = false;
  sliderHeight: number = 0;
  scrolled: boolean = false;

  constructor(public appCtrl: App, public navCtrl: NavController, private zone: NgZone, public spotsProvider: SpotsProvider, public placesProvider: PlacesProvider, public navParams: NavParams, public platform: Platform) {
    this.sliderHeight = this.platform.height() * 0.4 + 40;
  }

  showUser(id) {
    this.appCtrl.getRootNav().push('UserProfilePage', { id: id });
  }

   scrolledToggle(){
     this.zone.run(() => {
       this.scrolled = true;
     });
   }

  ionViewDidLoad() {
    this.spotsProvider.getOneSpot(this.navParams.get('spotSlug'))
      .subscribe(data => {
        this.spot = data;

        this.spotsProvider.getComments(this.spot._id)
          .subscribe(comments => this.comments = comments);

        this.placesProvider.getPlacesNearBy(this.spot.loc.coordinates, 50000)
        .subscribe(placesNearBy => this.placesNearBy = placesNearBy);

        this.spotsProvider.getSpotsNearBy(this.spot.loc.coordinates, 50000)
        .subscribe(spotsNearBy => this.spotsNearBy = spotsNearBy);
      });
  }

}
