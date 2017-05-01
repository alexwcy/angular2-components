import { Component, OnInit, ViewChild, ElementRef,Input } from '@angular/core';

@Component({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
	suggestionsExpanded = false;
	@Input() disabled = false;
	docHandler: Function;
	@ViewChild('suggestionsHolder') suggestionsHolder: ElementRef;

	constructor() { }

	ngOnInit() {
	}

	openSuggestions() {
		if(this.disabled){
			return;
		}
		this.suggestionsExpanded = !this.suggestionsExpanded;
		if (this.suggestionsExpanded) {
			this.docHandler = (e) => {
				if (!this.suggestionsHolder.nativeElement.contains(e.target)) {
					e.preventDefault();
					e.stopPropagation();
					this.suggestionsExpanded = false;
					console.log('doc Clicked');
					this.removeDocEventListener();
				}
			}
			document.addEventListener('click', <any>this.docHandler, true);
		}
	}

	removeDocEventListener() {
		if (this.docHandler) {
			document.removeEventListener('click', <any>this.docHandler, true);
		}
	}

	public collapseSuggestions() {
		this.suggestionsExpanded = false;
		this.removeDocEventListener();
	}
}
