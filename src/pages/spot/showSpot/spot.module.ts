import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpotPage } from './spot';
import { DirectivesModule } from '../../../directives/directives.module';
import { Ionic2RatingModule } from "ionic2-rating";
import { ComponentsModule } from "../../../components/components.module";
import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  declarations: [
    SpotPage
  ],
  imports: [
    IonicPageModule.forChild(SpotPage),
    Ionic2RatingModule,
    DirectivesModule,
    ComponentsModule,
    LazyLoadImageModule,
  ],
  exports: [
    SpotPage
  ]
})
export class SpotPageModule {}
