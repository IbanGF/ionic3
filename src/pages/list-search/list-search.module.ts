import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { Ionic2RatingModule } from "ionic2-rating";

import { ListSearchPage } from './list-search';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ListSearchPage,
  ],
  imports: [
    IonicModule,
    IonicPageModule.forChild(ListSearchPage),
    Ionic2RatingModule,
    ComponentsModule,
    DirectivesModule
  ],
  exports: [
    ListSearchPage
  ]
})
export class ListSearchPageModule {}
