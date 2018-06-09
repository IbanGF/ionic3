import { NgModule } from '@angular/core';
import { ContentDrawerComponent } from './content-drawer/content-drawer';
import { ShrinkingSegmentHeaderComponent } from './shrinking-segment-header/shrinking-segment-header';
import { IonicModule  } from 'ionic-angular';
// import { ExpandableHeaderComponent } from './expandable-header/expandable-header';

@NgModule({
	declarations: [ContentDrawerComponent,
    ShrinkingSegmentHeaderComponent],
	imports: [IonicModule],
	exports: [ContentDrawerComponent,
    ShrinkingSegmentHeaderComponent]
})
export class ComponentsModule {}
