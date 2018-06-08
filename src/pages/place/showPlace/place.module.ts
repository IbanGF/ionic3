import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { Ionic2RatingModule } from "ionic2-rating";


import { PlacePage } from './place';
import { DirectivesModule } from '../../../directives/directives.module';

@NgModule({
  declarations: [
    PlacePage
  ],
  imports: [
    IonicPageModule.forChild(PlacePage),
    TranslateModule.forChild(),
    DirectivesModule,
    Ionic2RatingModule
  ],
  exports: [
    PlacePage
  ]
})
export class PlacePageModule { }
