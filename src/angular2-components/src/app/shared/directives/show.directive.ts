import { Directive, Input, HostBinding, ElementRef } from '@angular/core';

@Directive({
	selector: '[appShow]'
})
export class ShowDirective {
	@Input('appShow') set appShow(val: boolean) {
		this.el.nativeElement.style.display = val ? 'block' : 'none'; 
	}

	// @HostBinding('style.display')
	// styleValue: string = (this.appShow === true) ? 'block' : 'none';

	constructor(private el: ElementRef) { }

}
