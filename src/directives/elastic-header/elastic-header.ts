import { Directive, ElementRef, Input, Renderer2, HostListener } from "@angular/core";
import { Content, Platform } from "ionic-angular";

@Directive({
  selector: "[elasticHeader]"
})
export class ElasticHeaderDirective {
  header: HTMLElement;
  toolbar: HTMLElement;
  headerHeight: number;
  sliderHeight: number = 0;
  lastScrollTop: number = 0;
  translateAmt: number = 0;

  @Input("elasticHeader") content: Content;

  constructor(public element: ElementRef, public renderer: Renderer2, public platform: Platform) {
  }

  ngOnInit() {
    this.sliderHeight = this.platform.height() * 0.4 - 56;
    this.header = this.element.nativeElement;
    this.toolbar = this.element.nativeElement.querySelector('.toolbar');
    this.content.ionScroll.subscribe(ev =>
      requestAnimationFrame(() => this.updateElasticHeader(ev.scrollTop))
    );
  }

  // @HostListener("window:resize")
  // resize() {
  //   this.headerHeight = this.header.clientHeight;
  // }
  // Right now header height doesn't change when window resized. If needed in the future, use this to prevent memory leak.
  updateElasticHeader(scrollTop: number) {
    if (scrollTop >= this.sliderHeight) this.renderer.setStyle(
      this.toolbar,
      "background",
      "#3db5e7"
    )
    else this.renderer.setStyle(
      this.toolbar,
      "background",
      "transparent"
    );
    !this.headerHeight && (this.headerHeight = this.header.clientHeight);

    if (this.lastScrollTop < 0) this.translateAmt = 0;
    else {
      this.translateAmt += (this.lastScrollTop - scrollTop) / 4;
      if (this.translateAmt > 0) this.translateAmt = 0;
      if (this.translateAmt < -this.headerHeight - 12)
        this.translateAmt = -this.headerHeight - 12;
    }
    this.renderer.setStyle(
      this.header,
      "transform",
      "translate3d(0," + this.translateAmt + "px, 0)"
    );
    this.lastScrollTop = scrollTop;
  }
}
