import { Component, Input, OnInit } from '@angular/core';
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

  ngOnInit() {
  }
  openPlace(place) {
    this.appCtrl.getRootNav().push('PlacePage', {
      placeSlug: place.slug,
      favorite: this.favorite
    })
  }
  setFavoriteStatus(event, placeId) {
    event.preventDefault();
    event.stopPropagation();
    if (this.authProvider.getLogStatus() === true) {
      if (this.userProvider.isFavoritePlace(placeId) === false) {
        this.userProvider.addPlaceFavorite(placeId)
          .subscribe();
      } else {
        this.userProvider.removePlaceFavorite(placeId)
          .subscribe();
      }
    } else {
      let loginModal = this.modalCtrl.create(LoginPage);
      loginModal.present();
    }

  }
}
