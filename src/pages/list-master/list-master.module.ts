import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule, IonicModule  } from 'ionic-angular';
import { Ionic2RatingModule } from "ionic2-rating";

import { ListMasterPage } from './list-master';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ListMasterPage
  ],
  imports: [
    IonicModule,
    IonicPageModule.forChild(ListMasterPage),
    TranslateModule.forChild(),
    Ionic2RatingModule,
    ComponentsModule
  ],
  exports: [
    ListMasterPage
  ]
})
export class ListMasterPageModule { }
