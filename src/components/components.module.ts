import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Ionic2RatingModule } from "ionic2-rating";

import { ShrinkingSegmentHeaderComponent } from './shrinking-segment-header/shrinking-segment-header';
import { ContentDrawerComponent } from './content-drawer/content-drawer';
import { CardPlaceComponent } from './card-place/card-place';
import { CardSpotComponent } from './card-spot/card-spot';

@NgModule({
  declarations: [ContentDrawerComponent,
    ShrinkingSegmentHeaderComponent,
    CardPlaceComponent,
    CardSpotComponent],
  imports: [IonicModule, Ionic2RatingModule],
  exports: [ContentDrawerComponent,
    ShrinkingSegmentHeaderComponent,
    CardPlaceComponent,
    CardSpotComponent]
})
export class ComponentsModule { }
