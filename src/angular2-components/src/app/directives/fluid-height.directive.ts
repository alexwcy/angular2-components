import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appFluidHeight]',
  host:{
    '(keyup)':'setHeight()'
  }
})
export class FluidHeightDirective {

  constructor(private el:ElementRef) { 
  }

  @HostBinding('style.height.px')
  height: number;

  setHeight(){
    this.height=18;
    this.height = this.el.nativeElement.scrollHeight+18;
  }

}
