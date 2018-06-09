import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpotsUserPage } from './spots-user';
import { Ionic2RatingModule } from "ionic2-rating";
import { ComponentsModule } from "../../../../components/components.module";

@NgModule({
  declarations: [
    SpotsUserPage,
  ],
  imports: [
    IonicPageModule.forChild(SpotsUserPage),
    ComponentsModule,
    Ionic2RatingModule
  ],
})
export class SpotsUserPageModule {}
