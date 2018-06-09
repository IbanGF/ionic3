import { Component, Input } from '@angular/core';
import { App } from 'ionic-angular';
import { User } from '../../providers/user/user'

@Component({
  selector: 'card-place',
  templateUrl: 'card-place.html'
})
export class CardPlaceComponent {
  @Input() place: any;
  
  constructor(public appCtrl: App, public userProvider: User) {}


  isFavoritePlace(id){
    return this.userProvider.isFavoritePlace(id);
  }

  openPlace(place) {
    this.appCtrl.getRootNav().push('PlacePage', {
      placeSlug: place.slug
    })
  }
}
