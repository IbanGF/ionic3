import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookeConstructionPage } from './booke-construction';

@NgModule({
  declarations: [
    BookeConstructionPage,
  ],
  imports: [
    IonicPageModule.forChild(BookeConstructionPage),
  ],
  exports: [
    BookeConstructionPage
  ]
})
export class BookeConstructionPageModule {}
