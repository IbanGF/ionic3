
import { AfterContentInit, ContentChildren, Directive, ElementRef, Optional, QueryList, Renderer } from '@angular/core';
import { NgControl } from '@angular/forms';

import { Config } from '../../../node_modules/ionic-angular/config/config';
import { BaseInput } from '../../../node_modules/ionic-angular/util/base-input';
import { SportihomeSegmentButton } from '../../components/sportihome-segment-button/sportihome-segment-button';

/**
 * Generated class for the SportihomeSegmentDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
 @Directive({
   selector: 'sportihome-segment',
   host: {
     '[class.sportihome-segment-disabled]': '_disabled'
   }
 })
 export class SportihomeSegment extends BaseInput<string> implements AfterContentInit {

   /**
    * @hidden
    */
   @ContentChildren(SportihomeSegmentButton) _buttons: QueryList<SportihomeSegmentButton>;

   constructor(
     config: Config,
     elementRef: ElementRef,
     renderer: Renderer,
     @Optional() ngControl: NgControl
   ) {
     super(config, elementRef, renderer, 'segment', null, null, null, ngControl);
   }

   /**
    * @hidden
    */
   ngAfterContentInit() {
     this._initialize();
     this._buttons.forEach(button => {
       button.ionSelect.subscribe((selectedButton: any) => {
         this.value = selectedButton.value;
         this._fireTouched();
       });
     });
   }

   /**
    * @hidden
    * Write a new value to the element.
    */
   _inputUpdated() {
     if (!this._buttons) {
       return;
     }
     const buttons = this._buttons.toArray();
     const value = this.value;
     for (var button of buttons) {
       button.isActive = (button.value === value);
     }
   }

 }
