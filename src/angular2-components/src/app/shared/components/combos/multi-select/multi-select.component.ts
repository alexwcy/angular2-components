import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs/Rx";
import * as _ from "underscore";

@Component({
	selector: 'app-multi-select',
	templateUrl: './multi-select.component.html',
	styleUrls: ['./multi-select.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectComponent implements OnInit {
	@Input() public labelText: string;
	@Input('suggestionsData') public suggestionsData: Observable<any>;
	@Input('selectedItems') public selectedItems: Observable<any>;
	@Input() public config: any;
	@Input() public nested: boolean;
	@Input() public showSelectAll: boolean = true;

	@Output() itemsChanged: EventEmitter<any> = new EventEmitter<any>();

	selectedItemIndex: number = 0;
	suggestions: Array<any>;
	suggestionsImm: any;
	selectedSuggestions: Array<any> = [];

	constructor(private el: ElementRef) { }

	ngOnInit() {

	}

	customTrackBy(index: number, obj: any): any {
		return index;
	}
	ngAfterViewInit() {
		let self = this;

		this.suggestionsData.subscribe(s => {

			this.suggestions = s.toJS();
			this.suggestionsImm = s;
		});

		this.selectedItems.subscribe(s => {
			this.selectedSuggestions = s.toJS();
		});

		this.el.nativeElement.addEventListener('keyup', (e) => {
			if (e.keyCode === 40) {
				if ((this.selectedItemIndex + 1) > this.suggestions.length - 1)
					this.selectedItemIndex = 0;
				else
					this.selectedItemIndex++;
			} else if (e.keyCode === 38) {
				if ((this.selectedItemIndex - 1) < 0)
					this.selectedItemIndex = this.suggestions.length - 1;
				else
					this.selectedItemIndex--;
			} else if ((e.keyCode === 13) || (e.keyCode === 32)) {
				this.chooseSuggestion({ checked: !this.findIfSelected(this.suggestions[this.selectedItemIndex]) }, this.selectedItemIndex);
			}
		})
	}

	displaySuggestions() {
		// this.suggestionsOpen = true;
		// this.suggestionsHolder.nativeElement.focus();
		// document.body.style.overflowY = 'hidden';
	}

	hideSuggestions() {
		// this.suggestionsOpen = false;
		// document.body.style.overflowY = 'initial';
	}

	// toggleSuggestions() {
	// 	if (this.suggestionsOpen) {
	// 		this.hideSuggestions();
	// 	} else {
	// 		this.displaySuggestions();
	// 	}
	// }

	chooseSuggestion(e, index) {
		console.log(e.checked, index);
		if (e.checked) {
			this.selectedSuggestions.unshift(this.suggestions[index]);
		} else {
			let item = _.find(this.selectedSuggestions, (s) => _.isEqual(s, this.suggestions[index]));
			if (item)
				this.selectedSuggestions.splice(this.selectedSuggestions.indexOf(item), 1);
		}
		this.itemsChanged.emit(this.selectedSuggestions);
	}

	chooseNestedSuggestion(e, header, index) {
		let suggestion = this.suggestionsImm.get(this.suggestionsImm.indexOf(header)).toJS();
		if (e.checked) {
			this.selectedSuggestions.unshift(suggestion.list[index]);
		} else {
			let item = _.find(this.selectedSuggestions, (s) => _.isEqual(s, suggestion.list[index]));
			if (item)
				this.selectedSuggestions.splice(this.selectedSuggestions.indexOf(item), 1);
		}
		this.itemsChanged.emit(this.selectedSuggestions);
	}

	findIfSelected(suggestion) {
		return (this.selectedSuggestions.filter(ss => _.isEqual(ss, suggestion)).length > 0);
	}

	selectAllSuggestions(e) {
		if (e.checked) {
			this.selectedSuggestions = this.suggestions.slice();
		} else {
			this.selectedSuggestions = [];
		}
		this.itemsChanged.emit(this.selectedSuggestions);
	}

	getSelectBoxText(selectedItems) {
		let size = selectedItems.size;
		return (size && size > 0) ? `${selectedItems} item${size > 0 ? 's' : ''} selected` : 'Select';
	}
}
