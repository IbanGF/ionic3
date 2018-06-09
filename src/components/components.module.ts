import { NgModule } from '@angular/core';
import { ContentDrawerComponent } from './content-drawer/content-drawer';
import { IonicModule  } from 'ionic-angular';
import { CardPlaceComponent } from './card-place/card-place';
import { Ionic2RatingModule } from "ionic2-rating";
import { CardSpotComponent } from './card-spot/card-spot';
// import { ExpandableHeaderComponent } from './expandable-header/expandable-header';
@NgModule({
	declarations: [ContentDrawerComponent,
    CardPlaceComponent,
    CardSpotComponent],
	imports: [IonicModule, Ionic2RatingModule],
	exports: [ContentDrawerComponent,
    CardPlaceComponent,
    CardSpotComponent]
})
export class ComponentsModule {}
