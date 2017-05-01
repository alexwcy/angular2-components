import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { List, Map, is } from 'immutable';

let noResultRow = Map({
	id: -1,
	tagName: 'No Results Found'
});

interface IDataConfig {
	text: string;
	value?: string;
}

@Component({
	selector: 'app-chips-plain',
	templateUrl: './chips-plain.component.html',
	styleUrls: ['./chips-plain.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ChipsPlainComponent implements OnInit, AfterViewInit {

	@ViewChild('inputBox') inputBox: ElementRef;

	@Input() public showNoResult = true;
	@Input() public labelText: string;
	@Input() public config: IDataConfig;
	@Input() public chipConfig: IDataConfig;
	@Input() public isDisabled: any;
	@Input() public closeOnSelect = false;
	@Input() public allowCustom = false;
	@Input() public handleSelectionInternally = false;
	@Input() public placeholderText = '';
	@Input() public hideLabel = false;
	@Input() public openOnFocus = true;
	@Input('focusInputBox') public focusInputBoxOb: Subject<any>;

	@Input('suggestions') set suggestionsInput(suggestions: List<any>) {
		this.setSuggestions(suggestions);
	};

	@Input('chips') set chipsInput(value) {
		this.chips = value;
		this.setSuggestions(this.suggestionsPristine);
	};

	@Output() selectedChips: EventEmitter<any> = new EventEmitter<any>();
	@Output() removedChip: EventEmitter<any> = new EventEmitter<any>();

	selectedChipIndex: number;
	selectedSuggestionIndex = 0;
	backpress = 0;
	showSuggestions = false;
	textBoxVal = '';
	suggestionsOriginal: List<any> = List();
	suggestionsPristine: List<any> = List();
	suggestions: List<any> = List();
	chips: List<any> = List();
	suggestionsLeftOffset = 0;

	constructor() {

	}
	// ngOnChanges(changes: SimpleChanges) {

	// }
	ngOnInit() {


		// this.focusInputBox();
	}

	ngAfterViewInit() {
		if (this.focusInputBoxOb) {
			this.focusInputBoxOb.subscribe(res => {
				this.focusInputBox();
			});
		}
	}

	setSuggestions(suggestions: List<any>) {
		if (!suggestions) { // null check
			suggestions = List<any>();
		}
		this.suggestionsPristine = suggestions;
		let excludedChipsSuggestions = suggestions.filter(suggestion => {
			if (suggestion.get(this.config.value) === 1 || suggestion.get(this.config.value) === 2) {
				return false;
			}
			return !this.chips.some(chip => chip.get(this.chipConfig.value) === suggestion.get(this.config.value));
		});

		this.suggestions = <List<any>>excludedChipsSuggestions;
		// this.suggestions = this.suggestions.filter(suggestion=> suggestion.get(this.config.value) == 1 || suggestion.get(this.config.value) == 2);
		this.suggestionsOriginal = this.suggestions;


	}

	focusInputBox() {
		setTimeout(() => {
			this.inputBox.nativeElement.focus();
		});
	}

	blurInputBox() {
		setTimeout(() => {
			this.inputBox.nativeElement.blur();
		});
	}

	textTyped(e) {
		if (e.keyCode === 8) {
			if (e.target.value.length === 0) {
				if (this.backpress === 0) {
					this.suggestions = this.suggestionsOriginal;
					this.selectedChipIndex = this.chips.size - 1;
					this.backpress++;
				}
				else {
					this.removeChip(this.chips.size - 1);
					this.backpress = 0;
				}
			} else {
				this.filterSuggestions(e.target.value);
				this.backpress = 0;
			}
		} else if (e.keyCode === 40) {
			if ((this.selectedSuggestionIndex + 1) > this.suggestions.size - 1) {
				this.selectedSuggestionIndex = 0;
			}
			else {
				this.selectedSuggestionIndex++;
			}
		} else if (e.keyCode === 38) {
			if ((this.selectedSuggestionIndex - 1) < 0) {
				this.selectedSuggestionIndex = this.suggestions.size - 1;
			}
			else {
				this.selectedSuggestionIndex--;
			}
		} else if (e.keyCode === 13 || e.keyCode === 32) {
			if (this.allowCustom || is(this.suggestions.first(), noResultRow)) {
				this.emitChosenSuggestion(e.target.value.trim());
				return;
			}
			if (e.keyCode === 13) {
				this.chooseSuggestion(this.selectedSuggestionIndex);
			}
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
		let filteredSuggestions = <List<any>>this.suggestionsOriginal
			.filter(s => {
				let sProp = this.config ? s.get(this.config.text) : s;
				return regex.test(sProp);
			});

		if (filteredSuggestions.size > 0) {
			this.suggestions = filteredSuggestions;
			this.expandSuggestions();
		} else if (this.showNoResult) {
			this.suggestions = List([noResultRow]);
		} else {
			this.suggestions = List();
		}

	}

	inputBoxFocused() {
		if (this.openOnFocus) {
			this.displaySuggestions();
		}
	}

	inputBoxBlurred(e) {
		if (this.allowCustom && (is(this.suggestions.first(), noResultRow)|| this.suggestions.size === 0)) {
			this.emitChosenSuggestion(e.target.value.trim());
		}
		this.hideSuggestions();
	}

	displaySuggestions(event?: any) {

		this.suggestions = this.suggestionsOriginal;
		this.expandSuggestions();
	}

	expandSuggestions() {
		this.suggestionsLeftOffset = this.inputBox.nativeElement.offsetLeft;
		this.showSuggestions = true;
	}

	hideSuggestions() {
		setTimeout(function() {
			this.showSuggestions = false;
			this.selectedChipIndex = -1;
			this.backpress = 0;
		}.bind(this), 200);
	}

	removeChip(idx: number) {
		this.removedChip.emit({ chip: this.chips.get(idx), index: idx });
		// this.chips.splice(idx, 1);
		// this.focusInputBox();
	}

	chooseSuggestion(i: number, e?: any) {
		if (e) {
			e.preventDefault();
		}
		this.backpress = 0;
		if (!this.allowCustom && is(this.suggestions.first(), noResultRow)) {
			return;
		}
		let chipItem;
		if (this.config.value) {
			if (this.chipConfig.value) {
				chipItem = this.chips.find(c => is(c.get(this.chipConfig.value), this.suggestions.getIn([i, this.config.value])));
			}
			else {
				chipItem = this.chips.find(c => is(c.get(this.config.value), this.suggestions.getIn([i, this.config.value])));
			}
		}
		else {
			chipItem = this.chips.find(c => is(c, this.suggestions.get(i)));
		}

		if (!chipItem) {
			this.emitChosenSuggestion(this.suggestions.get(i));
			this.suggestions = this.suggestionsOriginal.delete(i);
		}

	}

	emitChosenSuggestion(suggestion) {
		this.textBoxVal = '';
		if (this.handleSelectionInternally) {
			this.chips = this.chips.push(suggestion);
		}
		this.selectedChips.emit(List([suggestion]));

		if (this.closeOnSelect) {
			this.hideSuggestions();
		}
	}

	getChipValue(chip) {
		return this.chipConfig ? (Map.isMap(chip) ? chip.get(this.chipConfig.text) : (this.allowCustom ? chip : null)) : chip;
	}
}
