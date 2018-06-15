import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyprofilePage } from './my-profile';
import { ComponentsModule } from '../../../components/components.module';
import { DirectivesModule } from '../../../directives/directives.module';

@NgModule({
  declarations: [
    MyprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(MyprofilePage),
    ComponentsModule,
    DirectivesModule
  ],
  exports: [MyprofilePage]
})
export class UserProfilePageModule {}
