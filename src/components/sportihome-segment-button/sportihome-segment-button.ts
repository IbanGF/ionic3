import { Component, EventEmitter, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';

import { isPresent, isTrueProperty } from '../../../node_modules/ionic-angular/util/util';


/**
 * Generated class for the SportihomeSegmentButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
 @Component({
   selector: 'sportihome-segment-button',
   template:
     '<ng-content></ng-content>' +
     '<div class="button-effect"></div>',
   host: {
     'tappable': '',
     'class': 'sportihome-segment-button',
     'role': 'button',
     '[class.sportihome-segment-button-disabled]': '_disabled',
     '[class.sportihome-segment-activated]': 'isActive',
     '[attr.aria-pressed]': 'isActive'
   },
   encapsulation: ViewEncapsulation.None,
 })
 export class SportihomeSegmentButton {

   isActive: boolean = false;
   _disabled: boolean = false;

   /**
    * @input {string} the value of the segment button. Required.
    */
   @Input() value: string;

   /**
    * @output {SegmentButton} Emitted when a segment button has been clicked.
    */
   @Output() ionSelect: EventEmitter<SportihomeSegmentButton> = new EventEmitter<SportihomeSegmentButton>();

   /**
    * @input {boolean} If true, the user cannot interact with this element.
    */
   @Input()
   get disabled(): boolean {
     return this._disabled;
   }

   set disabled(val: boolean) {
     this._disabled = isTrueProperty(val);
   }

   constructor() {}

   /**
    * @hidden
    * On click of a SegmentButton
    */
   @HostListener('click')
   onClick() {
     console.debug('SegmentButton, select', this.value);
     this.ionSelect.emit(this);
   }

   /**
    * @hidden
    */
   ngOnInit() {
     if (!isPresent(this.value)) {
       console.warn('<ion-segment-button> requires a "value" attribute');
     }
   }

 }
