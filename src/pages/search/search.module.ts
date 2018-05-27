import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule, IonicModule  } from 'ionic-angular';
import { Ionic2RatingModule } from "ionic2-rating";

import { SearchPage } from './search';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicModule,
    IonicPageModule.forChild(SearchPage),
    TranslateModule.forChild(),
    Ionic2RatingModule,
    ComponentsModule
  ],
  exports: [
    SearchPage
  ]
})
export class SearchPageModule { }
