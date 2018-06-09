import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnoncesPage } from './annonces';
import { Ionic2RatingModule } from "ionic2-rating";
import { ComponentsModule } from "../../../../components/components.module";

@NgModule({
  declarations: [
    AnnoncesPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnoncesPage),
    Ionic2RatingModule,
    ComponentsModule
  ],
})
export class AnnoncesPageModule {}
