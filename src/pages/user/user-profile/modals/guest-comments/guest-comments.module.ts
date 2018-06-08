import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestCommentsPage } from './guest-comments';
import { Ionic2RatingModule } from "ionic2-rating";

@NgModule({
  declarations: [
    GuestCommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(GuestCommentsPage),
    Ionic2RatingModule
  ],
})
export class GuestCommentsPageModule {}
