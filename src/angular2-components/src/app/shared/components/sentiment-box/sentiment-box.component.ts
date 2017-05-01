import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
	selector: 'app-sentiment-box',
	templateUrl: './sentiment-box.component.html',
	styleUrls: ['./sentiment-box.component.scss'],
	host: {
		style: 'position: relative;'
	}
})
export class SentimentBoxComponent implements OnInit {
	isDropDownOpen: boolean = false;
	blurInProgress: boolean = false;
	dropdownEl: any;

	@Input() selectedSentiment: any;
	@Input() isDisabled?: boolean;
	@Output() sentimentChanged: EventEmitter<any> = new EventEmitter();

	@ViewChild('dropdown') dropdown: ElementRef;
	constructor() { }

	ngOnInit() {
		this.dropdownEl = this.dropdown.nativeElement;
	}

	openDropdown() {
		if (this.isDropDownOpen === false && !this.blurInProgress) {
			this.dropdownEl.tabIndex = 0;
			this.dropdownEl.focus();
			this.isDropDownOpen = true;
		}
	}

	collapseDropdown(e) {
		this.blurInProgress = true;
		this.dropdownEl.tabIndex = -1;
		this.isDropDownOpen = false;
		setTimeout(() => {
			this.blurInProgress = false;
		}, 100);
	}

	getSelectedSentimentClass(sentiment) {
		if (typeof sentiment === 'string') {
			return sentiment;
		}
		switch (sentiment) {
			case 0:
				return 'positive';
			case 1:
				return 'negative';
			case 2:
				return 'neutral';
			default:
				return 'positive';
		}
	}

	changeSentiment(sentiment) {
		this.sentimentChanged.emit(sentiment);
        this.isDropDownOpen = false;
	}

}
