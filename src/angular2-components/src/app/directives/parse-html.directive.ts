import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[appParseHtml]'	
})
export class ParseHtmlDirective {
	el;
	constructor(private elem: ElementRef) {
		this.el = this.elem.nativeElement;
	}
	ngAfterViewInit() {
		//console.log("viewInnit" + this.el);
		//this.el.valueChanges.subscribe(val => console.log(val));
		this.el.value = this.parseHtml(this.el.value);
	}
	
	@HostListener('change', ['$event'])
onChange(e) {
  //console.log("change");
}

	@HostListener('click', ['$event'])
	onClick(e) {
		console.log("clcickdetected" + this.el);
		//this.el.value = this.parseHtml(this.el.value);
	}
	parseHtml(str) {
		if (str) {
			str = str.replace(/<br>/gi, "\n");
			str = str.replace(/<br \/>/gi, "\n");
			str = str.replace(/<div>/gi, "\n");
			str = str.replace(/<\/div>/gi, "\n");
			str = str.replace(/<\/span>/gi, "");
			str = str.replace(/<p>/gi, "\n");
			str = str.replace(/<\/p>/gi, "\n");
			str = str.replace(/&nbsp;/gi, "");
			str = str.replace(/<div[^>]*>|<\/div>$/g, '\n');
			str = str.replace(/<span[^>]*>|<\/span>$/g, '');
			str = str.replace(/<br[^>]*>|<\/br>$/g, '\n');
			return str;
		}
		else {
			return null;
		}
	}
}
