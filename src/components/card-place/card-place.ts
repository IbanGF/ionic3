import { Component, Input, } from '@angular/core';
import { App, ModalController } from 'ionic-angular';
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

  constructor(public appCtrl: App, public userProvider: User, public authProvider: AuthProvider, public modalCtrl: ModalController) { }


  openPlace(place, favorite) {
    console.log('ta maman chienne '+favorite);
    this.appCtrl.getRootNav().push('PlacePage', {
      placeSlug: place.slug,
      favorite: favorite,
    })
  }
}
