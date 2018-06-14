import { Component, Input, } from '@angular/core';
import { App, ModalController, NavController } from 'ionic-angular';
import { User, AuthProvider } from '../../providers/providers';
import { LoginPage } from '../../pages/login/login'
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'card-place',
  templateUrl: 'card-place.html'
})
export class CardPlaceComponent {
  @Input('place') place: any;
  @Input('favorite') favorite: any;
  @Input('isVertical') isVertical: any;

  favArray: any;

  constructor(public appCtrl: App, public userProvider: User, public authProvider: AuthProvider, public modalCtrl: ModalController, public navCtrl: NavController) { }


  // openPlace(place, favorite) {
  //   this.appCtrl.getRootNav().push('PlacePage', {
  //     placeSlug: place.slug,
  //     favorite: favorite,
  //   })
  // }

  openPlace(place, favorite) {
   this.navCtrl.push('PlacePage', {
     placeSlug: place.slug,
     favorite: favorite,
   })
 }

  // ==========================
  //        WITH NAVCTRL
  // ==========================
  // constructor(public appCtrl: App, public userProvider: User, public authProvider: AuthProvider, public modalCtrl: ModalController, public navCtrl: NavController) {}
  //
  //
  // openPlace(place, favorite) {
  //
  //   this.navCtrl.setRoot('PlacePage', {
  //     placeSlug: place.slug,
  //     favorite: favorite,
  //   })
  // }
}
