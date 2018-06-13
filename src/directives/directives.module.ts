import { NgModule } from '@angular/core';
import { ElasticHeaderDirective } from './elastic-header/elastic-header';
import { ParallaxHeaderDirective } from './parallax-header/parallax-header';
import { SportihomeSegment } from './sportihome-segment/sportihome-segment';
@NgModule({
	declarations: [ElasticHeaderDirective,
    ParallaxHeaderDirective,
    SportihomeSegment],
	imports: [],
	exports: [ElasticHeaderDirective,
    ParallaxHeaderDirective,
    SportihomeSegment]
})
export class DirectivesModule {}
