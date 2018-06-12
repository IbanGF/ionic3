import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { Ionic2RatingModule } from "ionic2-rating";

import { SigninPage } from './signin';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    SigninPage,
  ],
  imports: [
    IonicModule,
    IonicPageModule.forChild(SigninPage),
    Ionic2RatingModule,
    ComponentsModule,
    DirectivesModule
  ],
  exports: [
    SigninPage
  ]
})
export class SigninPageModule {}
