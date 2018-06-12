import { NgModule } from '@angular/core';
import { ElasticHeaderDirective } from './elastic-header/elastic-header';
import { ParallaxHeaderDirective } from './parallax-header/parallax-header';
@NgModule({
	declarations: [ElasticHeaderDirective,
    ParallaxHeaderDirective],
	imports: [],
	exports: [ElasticHeaderDirective,
    ParallaxHeaderDirective]
})
export class DirectivesModule {}
