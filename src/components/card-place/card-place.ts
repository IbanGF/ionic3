import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-place',
  templateUrl: 'card-place.html'
})
export class CardPlaceComponent {
  @Input() place: any;
  constructor() {}
}
