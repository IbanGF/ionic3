import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HostCommentsPage } from './host-comments';
import { Ionic2RatingModule } from "ionic2-rating";

@NgModule({
  declarations: [
    HostCommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(HostCommentsPage),
    Ionic2RatingModule
  ],
})
export class HostCommentsPageModule {}
