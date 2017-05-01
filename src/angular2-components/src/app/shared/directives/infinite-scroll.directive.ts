import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
	selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {
	@Output() reachedBottom: EventEmitter<any> = new EventEmitter();

	@HostListener('scroll', ['$event'])
	onScroll(e) {
		let el = e.target;
		// console.log(el.scrollHeight,(el.scrollTop + el.clientHeight))
		if (el.scrollHeight === (el.scrollTop + el.clientHeight)) {
			this.reachedBottom.emit();
		}
	}

	constructor() { }

}
