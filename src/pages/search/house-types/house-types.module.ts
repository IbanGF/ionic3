import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HouseTypesPage } from './house-types';

@NgModule({
  declarations: [
    HouseTypesPage,
  ],
  imports: [
    IonicPageModule.forChild(HouseTypesPage),
  ],
  exports: [
    HouseTypesPage
  ]
})
export class HouseTypesPageModule {}
