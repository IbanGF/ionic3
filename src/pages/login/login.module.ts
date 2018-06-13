import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { Ionic2RatingModule } from "ionic2-rating";

import { LoginPage } from './login';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicModule,
    IonicPageModule.forChild(LoginPage),
    Ionic2RatingModule,
    ComponentsModule,
    DirectivesModule
  ],
  exports: [
    LoginPage
  ]
})
export class LoginPageModule {}
