import { Component, Input } from '@angular/core';
import { App } from 'ionic-angular';

@Component({
  selector: 'card-spot',
  templateUrl: 'card-spot.html'
})
export class CardSpotComponent {
  @Input() spot: any;

  constructor(public appCtrl: App) {}

  openSpot(spot) {
    console.log(spot)
    this.appCtrl.getRootNav().push('SpotPage', {
      spotSlug: spot.slug
    });
  }

}
