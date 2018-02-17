import { Component, Input, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DomController } from 'ionic-angular';

/**
 * Generated class for the ExpandableHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'expandable-header',
  templateUrl: 'expandable-header.html'
})
export class ExpandableHeaderComponent {

  // @ViewChild(Content) content: Content;

  text: string;

  constructor(public element: ElementRef, public renderer: Renderer2, public domCtrl: DomController) {
    // console.log(this.content);
  }

  onScroll(ev) {
    console.log('scrolling', ev)
      if (ev.scrollTop == 0) {
        this.domCtrl.write(() => {
          console.log('is 0');
          this.renderer.setStyle(this.element.nativeElement, 'top', 100 + '%');
        });
      }

  }

  // ngAfterViewInit() {
  //   console.log('Hello ExpandableHeaderComponent Component', this.scrollArea);
  //   this.renderer.setStyle(this.element.nativeElement.parentNode, 'top', 0);
  //   console.log('nativeElement', this.element.nativeElement.parentNode);
  //   this.scrollArea.ionScroll.subscribe((ev) => {
  //     console.log(ev);
  //     this.resizeListDrawer(ev);
  //   })
  // }
  //
  // resizeListDrawer(ev) {
  //   console.log(ev.scrollTop);
  //   if (ev.scrollTop == 0) {
  //     this.domCtrl.write(() => {
  //       console.log('is 0');
  //       this.renderer.setStyle(this.element.nativeElement.parentNode, 'top', 100 + '%');
  //     });
  //   }
  // }

}
