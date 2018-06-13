import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HobbiesSelectMultiplePage } from './hobbies-select-multiple';


@NgModule({
  declarations: [
    HobbiesSelectMultiplePage,
  ],
  imports: [
    IonicPageModule.forChild(HobbiesSelectMultiplePage),
  ],
  exports: [
    HobbiesSelectMultiplePage
  ]
})
export class HobbiesSelectMultiplePageModule {}
