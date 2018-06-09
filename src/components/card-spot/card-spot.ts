import { Component, Input } from '@angular/core';

/**
 * Generated class for the CardSpotComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'card-spot',
  templateUrl: 'card-spot.html'
})
export class CardSpotComponent {

  @Input() spot: any;

  constructor() {
  }

}
