import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from "@angular/core";
import { Observable } from "rxjs/Rx";
import * as _ from "underscore";

interface IDataConfig {
	text: string,
	value?: string
}

@Component({
	selector: 'app-chips',
	templateUrl: './chips.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {
	@Input() public labelText: string;
	@Input('chips') public chipsOb: Observable<any>;
	@Input('suggestions') public suggestionsOb: Observable<any>;
	@Input('suggestionsOriginal') public suggestionsOriginalOb: Observable<any>;
	@Input() public config: IDataConfig;
	@Input() public isDisabled: any;
	@Input() public closeOnSelect: boolean = false;
	@Input() public placeholderText: string = '';
	@Input() public hideLabel: boolean = false;
	@Input() public disableSystemTags = false;

	@Output() selectedChips: EventEmitter<any> = new EventEmitter<any>();
	@Output() filteredSuggestions: EventEmitter<any> = new EventEmitter<any>();

	selectedChipIndex: number;
	selectedSuggestionIndex: number = 0;
	backpress: number = 0;
	showSuggestions: boolean = false;
	textBoxVal: string = '';
	chips: Array<any> = [];
	suggestionsOriginal: Array<any>;
	suggestions: Array<any>;

	constructor() {

	}

	ngOnInit() {
		this.chipsOb.subscribe(c => {
			this.chips = c ? c.toJS() : [];
		});

		this.suggestionsOb.subscribe(s => {
			this.suggestions = s.toJS();
			this.suggestionsOriginal = s.toJS();
		})
	}

	ngAfterViewInit() {
	}

	textTyped(e) {
		if (e.keyCode === 8) {
			if (e.target.value.length === 0) {
				if (this.backpress === 0) {
					// this.filteredSuggestions.emit(this.suggestionsOriginal);
					this.suggestions = this.suggestionsOriginal;
					this.selectedChipIndex = this.chips.length - 1;
					this.backpress++;
				}
				else {
					this.chips.pop();
					this.selectedChips.emit(this.chips);
					this.backpress = 0;
				}
			} else {
				this.filterSuggestions(e.target.value);
				this.backpress = 0;
			}
		} else if (e.keyCode === 40) {
			if ((this.selectedSuggestionIndex + 1) > this.suggestions.length - 1)
				this.selectedSuggestionIndex = 0;
			else
				this.selectedSuggestionIndex++;
		} else if (e.keyCode === 38) {
			if ((this.selectedSuggestionIndex - 1) < 0)
				this.selectedSuggestionIndex = this.suggestions.length - 1;
			else
				this.selectedSuggestionIndex--;
		} else if (e.keyCode === 13) {
			this.chooseSuggestion(this.selectedSuggestionIndex);
		}
		else {
			this.backpress = 0;
			this.filterSuggestions(e.target.value);
		}
	}

	filterSuggestions(value) {
		let val = value;
		this.selectedChipIndex = -1;
		let regex = new RegExp(`.*${val}.*`, 'gi');
		this.suggestions = this.suggestionsOriginal
			.filter(s => {

				if (this.disableSystemTags) {
					if (s.id == 1 || s.id == 2)
						return false;
				}
				let sProp = this.config ? s[this.config.text] : s;
				return regex.test(sProp);
			});
		if (this.suggestions.length > 0) {
			// console.log(this.suggestions);
			// this.filteredSuggestions.emit(this.suggestions);
			this.showSuggestions = true;
		}
	}

	displaySuggestions() {
		this.suggestions = this.suggestionsOriginal.filter(s => {
			if (this.disableSystemTags) {
				if (s.id == 1 || s.id == 2)
					return false;
			}
			return true;
		});
		this.showSuggestions = true;
	}

	showCross(chip) {
		if (!chip) return;

		if (this.disableSystemTags) {
			if (chip.id == 1 || chip.id == 2)
				return false;
		}

		return true;
	}

	hideSuggestions() {
		setTimeout(function () {
			this.showSuggestions = false;
			this.selectedChipIndex = -1;
			this.backpress = 0;
		}.bind(this), 200);
	}

	removeChip(idx: number) {
		this.chips.splice(idx, 1);
		this.selectedChips.emit(this.chips);
	}

	chooseSuggestion(i: number, e?: any) {
		if (e) {
			e.preventDefault();
		}
		this.backpress = 0;
		let chipItem = _.find(this.chips, (c) => _.isEqual(c, this.suggestions[i]));
		if (!chipItem) {
			this.textBoxVal = '';
			this.chips.push(this.suggestions[i]);
			// console.log(this.chips);
			this.suggestions = this.suggestionsOriginal;
			this.selectedChips.emit(this.chips);
			// this.filteredSuggestions.emit(this.suggestions);
			if (this.closeOnSelect) {
				this.hideSuggestions();
			}
		}

	}
}
