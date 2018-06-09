import { Component, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'shrinking-segment-header',
  templateUrl: 'shrinking-segment-header.html'
})
export class ShrinkingSegmentHeaderComponent {

  @Input('scrollArea') scrollArea: any;
  // @Input('headerHeight') headerHeight: number;

  header: HTMLElement;
  newHeaderHeight: any;
  lastScrollTop: number = 0;
  translateAmt: number = 0;
  headerHeight: number;

  constructor(public element: ElementRef, public renderer: Renderer2) {

  }

  ngAfterViewInit(){

    // this.renderer.setElementStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');\
    this.header = this.element.nativeElement;

    this.scrollArea.ionScroll.subscribe((ev) => {
      this.resizeHeader(ev);
    });

  }

  resizeHeader(ev){

    ev.domWrite(() => {

      !this.headerHeight && (this.headerHeight = this.element.nativeElement.clientHeight);

      if (this.lastScrollTop < 0) this.translateAmt = 0;
      else {
        this.translateAmt += (this.lastScrollTop - ev.scrollTop) / 4;
        if (this.translateAmt > 0) this.translateAmt = 0;
        if (this.translateAmt < -this.headerHeight - 12)
          this.translateAmt = -this.headerHeight - 12;
      }
      this.renderer.setStyle(
        this.element.nativeElement,
        "transform",
        "translate3d(0," + this.translateAmt + "px, 0)"
      );
      this.lastScrollTop = ev.scrollTop;

    });

  }

}
