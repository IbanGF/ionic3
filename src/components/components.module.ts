import { NgModule } from '@angular/core';
import { ContentDrawerComponent } from './content-drawer/content-drawer';
import { IonicModule  } from 'ionic-angular';
import { CardPlaceComponent } from './card-place/card-place';
import { Ionic2RatingModule } from "ionic2-rating";
// import { ExpandableHeaderComponent } from './expandable-header/expandable-header';
@NgModule({
	declarations: [ContentDrawerComponent,
    CardPlaceComponent],
	imports: [IonicModule, Ionic2RatingModule],
	exports: [ContentDrawerComponent,
    CardPlaceComponent]
})
export class ComponentsModule {}
