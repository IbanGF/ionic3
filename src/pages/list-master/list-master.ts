import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { PlacesProvider } from '../../providers/places/places';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentPlaces: Item[];

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, public places: PlacesProvider) {

  }

  ionViewDidLoad() {
    this.places.getPlaces().subscribe(data => {
      console.log(data);
      this.currentPlaces = data;
    },
    err => {
      console.log(err);
    });
  }

  // addPlace() {
  //   let addModal = this.modalCtrl.create('PlaceCreatePage');
  //   addModal.onDidDismiss(place => {
  //     if (place) {
  //       this.places.add(place);
  //     }
  //   })
  //   addModal.present();
  // }

  // deleteItem(place) {
  //   this.places.delete(place);
  // }


  // openItem(place: Item) {
  //   this.navCtrl.push('PlaceDetailPage', {
  //     place: place
  //   });
  // }
}
