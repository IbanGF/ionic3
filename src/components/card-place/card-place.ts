import { Component, Input } from '@angular/core';
import { App, ModalController } from 'ionic-angular';
import { User, AuthProvider } from '../../providers/providers';
import { LoginPage } from '../../pages/login/login'

@Component({
  selector: 'card-place',
  templateUrl: 'card-place.html'
})
export class CardPlaceComponent {
  @Input('place') place: any;
  @Input('favorite') favorite: any;
  @Input('isVertical') isVertical: any;

  favArray: any;

  constructor(public appCtrl: App, public userProvider: User, public authProvider: AuthProvider, public modalCtrl: ModalController) { }


  openPlace(place) {
    console.log('aio');
    this.appCtrl.getRootNav().push('PlacePage', {
      placeSlug: place.slug,
    })
  }
}
