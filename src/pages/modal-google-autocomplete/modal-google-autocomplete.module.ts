import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalGoogleAutocompletePage } from './modal-google-autocomplete';

@NgModule({
  declarations: [
    ModalGoogleAutocompletePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalGoogleAutocompletePage),
  ],
  exports: [
    ModalGoogleAutocompletePage
  ]
})
export class ModalGoogleAutocompletePageModule {}
