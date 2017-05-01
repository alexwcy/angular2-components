import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { PopoverService } from './popover.service';

@Directive({
  selector: '[appPopoverClose]'
})
export class PopoverCloseDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
