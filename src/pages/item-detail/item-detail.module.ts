import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ItemDetailPage } from './item-detail';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemDetailPage
  ],
  imports: [
    IonicPageModule.forChild(ItemDetailPage),
    TranslateModule.forChild(),
    DirectivesModule
  ],
  exports: [
    ItemDetailPage
  ]
})
export class ItemDetailPageModule { }
