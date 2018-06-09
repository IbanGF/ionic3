import { Component, NgZone } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

declare let google: any;
/**
 * Generated class for the ModalGoogleAutocompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-google-autocomplete',
  templateUrl: 'modal-google-autocomplete.html',
})
export class ModalGoogleAutocompletePage {

  GoogleAutocomplete: any;
  Geocoder: any;
  autocomplete = { input: '', data: {} };
  autocompleteItems = [];

  constructor(private navParams: NavParams, private view: ViewController, private zone: NgZone) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.Geocoder = new google.maps.Geocoder;
  }

  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  selectSearchResult(item) {
    this.autocompleteItems = [];
    this.Geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {
        this.view.dismiss(results[0]);
      }
    })
  }

  closeModal() {
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalGoogleAutocompletePage');
  }

}
