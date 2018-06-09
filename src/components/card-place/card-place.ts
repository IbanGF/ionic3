import { Component, Input } from '@angular/core';
import { App } from 'ionic-angular';

@Component({
  selector: 'card-place',
  templateUrl: 'card-place.html'
})
export class CardPlaceComponent {
  @Input() place: any;
  constructor(public appCtrl: App) {}

  openPlace(place) {
    this.appCtrl.getRootNav().push('PlacePage', {
      placeSlug: place.slug
    })
  }
}
