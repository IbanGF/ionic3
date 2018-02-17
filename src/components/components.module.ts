import { NgModule } from '@angular/core';
import { ContentDrawerComponent } from './content-drawer/content-drawer';
import { IonicModule  } from 'ionic-angular';
// import { ExpandableHeaderComponent } from './expandable-header/expandable-header';
@NgModule({
	declarations: [ContentDrawerComponent],
	imports: [IonicModule],
	exports: [ContentDrawerComponent]
})
export class ComponentsModule {}
