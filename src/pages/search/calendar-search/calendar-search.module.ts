import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarSearchPage } from './calendar-search';

@NgModule({
  declarations: [
    CalendarSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarSearchPage),
  ],
  exports: [
    CalendarSearchPage
  ]
})
export class CalendarSearchPageModule {}
