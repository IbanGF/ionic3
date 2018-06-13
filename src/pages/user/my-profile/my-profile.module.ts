import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyprofilePage } from './my-profile';

@NgModule({
  declarations: [
    MyprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(MyprofilePage),
  ],
  exports: [MyprofilePage]
})
export class MyprofilePageModule {}