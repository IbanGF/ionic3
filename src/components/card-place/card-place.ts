import { Component, Input } from '@angular/core';
import { User } from '../../providers/user/user'

@Component({
  selector: 'card-place',
  templateUrl: 'card-place.html'
})
export class CardPlaceComponent {
  @Input() place: any;
  constructor(public userProvider: User) {}

  isFavoritePlace(id){
    return this.userProvider.isFavoritePlace(id);
  }
}
