import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendConstructionPage } from './send-construction';

@NgModule({
  declarations: [
    SendConstructionPage,
  ],
  imports: [
    IonicPageModule.forChild(SendConstructionPage),
  ],
  exports: [
    SendConstructionPage
  ]
})
export class SendConstructionPageModule {}
