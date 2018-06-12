import { Component, Input, OnInit } from '@angular/core';
import { App } from 'ionic-angular';
import { User } from '../../providers/providers';

@Component({
  selector: 'card-place',
  templateUrl: 'card-place.html'
})
export class CardPlaceComponent {
  @Input() place: any;
  @Input() favorite: boolean;
  favArray: any;
  constructor(public appCtrl: App, public userProvider: User) { }

  ngOnInit() {
  }
  openPlace(place) {
    this.appCtrl.getRootNav().push('PlacePage', {
      placeSlug: place.slug,
      favorite: this.favorite
    })
  }
  setFavoriteStatus(event, placeId){
    event.preventDefault();
    if(this.userProvider.isFavoritePlace(placeId) === false){
      this.userProvider.addPlaceFavorite(placeId)
      .subscribe();
    }else{
      this.userProvider.removePlaceFavorite(placeId)
      .subscribe();
    }
  }
}
