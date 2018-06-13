import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritePlaces } from './favorite-places';
import { Ionic2RatingModule } from "ionic2-rating";
import { ComponentsModule } from "../../../../components/components.module";

@NgModule({
  declarations: [
    FavoritePlaces,
  ],
  imports: [
    IonicPageModule.forChild(FavoritePlaces),
    Ionic2RatingModule,
    ComponentsModule
  ],
})
export class FavoritePlacesModule {}
