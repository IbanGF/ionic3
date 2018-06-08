import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EquipementsPage } from './equipements';

@NgModule({
  declarations: [
    EquipementsPage,
  ],
  imports: [
    IonicPageModule.forChild(EquipementsPage),
  ],
  exports: [EquipementsPage]
})
export class EquipementsPageModule {}
