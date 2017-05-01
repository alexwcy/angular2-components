import { Component, OnInit, Input, ElementRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { List, Map, fromJS, is, Record } from 'immutable';

const KEY_CODES = {
	BACKSPACE: 8,
	TAB: 9,
	ENTER: 13,
	ESC: 27,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
};

export const SuggestionValueConfigRecord = Record({
	text: null,
	value: null
});

export const ConfigRecord = Record({
	selectedValConfig: new SuggestionValueConfigRecord(),
	suggestionsConfig: new SuggestionValueConfigRecord(),
	handleSelectionInternally: true,
	placeholderText: 'Type here...',
	clearTextOnOpen: true,
	cyclic: true,
	collapseOnSelect: true,
	filter: true,
	labelText: false,
	defaultValue: ''
});

@Component({
	selector: 'app-auto-suggest',
	templateUrl: './auto-suggest.component.html',
	styleUrls: ['./auto-suggest.component.scss'],
	host: {
		style: 'width: auto;display: inline-block;'
	}
})
export class AutoSuggestComponent implements OnInit {

	suggestions: List<any>;
	suggestionsOriginal: List<any>;

	@Input() config: Record<string, any> = new ConfigRecord();

	@Input('suggestions') set setSuggestions(suggestions: List<any>) {
		this.suggestions = suggestions;
		this.suggestionsOriginal = suggestions;
	};
	@Input('selectedValue') selectedValue: Map<string, any> | string | number;

	@Output('suggestionChosen') suggestionChosen: EventEmitter<any> = new EventEmitter();

	selectedIndex: number = -1;
	suggestionsOpen: boolean = false;
	docHandler: Function;

	@ViewChild('suggestionsHolder') suggestionsHolder: ElementRef;
	@ViewChild('inputBox') inputBox: ElementRef;
	@ViewChild('inputText') inputText: ElementRef;
	@ViewChild('downChevron') downChevron: ElementRef;

	constructor() { }


	filterSuggestions(val) {
		if (!val) {
			this.suggestions = this.suggestionsOriginal;
			return;
		}
		this.selectedIndex = -1;
		let regex = new RegExp(`.*${val}.*`, 'i');
		let filteredSuggestions = <List<any>>this.suggestionsOriginal
			.filter(s => {
				let sProp = this.getSuggestionValue(s);
				return regex.test(sProp);
			});

		if (filteredSuggestions.size > 0) {
			this.suggestions = filteredSuggestions;
			this.suggestionsOpen = true;
		} else {
			this.suggestions = List.of(['No results found']);
		}

	}

	ngOnInit() {

	}

	inputTextKeyDown(e: KeyboardEvent) {
		e.stopPropagation();
		switch (e.which) {
			case KEY_CODES.LEFT:
			case KEY_CODES.UP: {
				e.preventDefault();
				if (this.selectedIndex <= 0) {
					if (this.config.get('cyclic') === true) {
						this.selectedIndex = this.suggestions.size - 1;
					}
				} else {
					--this.selectedIndex;
				}
			}
				break;
			case KEY_CODES.DOWN:
			case KEY_CODES.RIGHT:
				{

					e.preventDefault();
					if (this.selectedIndex === this.suggestions.size - 1) {
						if (this.config.get('cyclic') === true) {
							this.selectedIndex = 0;
						}
					} else {
						++this.selectedIndex;
					}
				}
				break;

			case KEY_CODES.ENTER:
				e.preventDefault();
				this.chooseSuggestion(this.selectedIndex);
				break;

			case KEY_CODES.ESC:
				this.collapseSuggestions();
				break;

			// 	case KEY_CODES.BACKSPACE:
			// break;

			default: this.filterSuggestions((<any>(e.target)).value);
		}
	}

	chooseSuggestion(index) {
		let outputItem = Map({
			item: this.suggestions.get(index),
			index
		});
		this.suggestionChosen.emit(outputItem);
		if (this.config.get('handleSelectionInternally') === true) {
			this.selectedValue = this.suggestions.get(index);
		};
		if (this.config.get('collapseOnSelect')) {
			this.collapseSuggestions();
		}
	}

	toggleShowSuggestions(e) {
		if (!this.suggestionsOpen) {
			this.openSuggestions();
			setTimeout(() => {
				document.addEventListener('click', <any>this.docHandler, true);
				this.inputText.nativeElement.focus();
			});
		} else {
			if (this.downChevron.nativeElement.contains(e.target)) {
				document.removeEventListener('click', <any>this.docHandler, true);
				this.collapseSuggestions();
				return;
			}
		}

		this.docHandler = (e) => {
			e.preventDefault();
			e.stopPropagation();
			// if (this.inputBox.nativeElement.contains(e.target)) {
			// 	return;
			// }

			this.collapseSuggestions();
			document.removeEventListener('click', <any>this.docHandler, true);
		}

	}

	openSuggestions() {
		this.suggestions = this.suggestionsOriginal;
		this.suggestionsOpen = true;

		if (this.config.get('clearTextOnOpen') === true && this.config.get('filter')) {
			this.inputText.nativeElement.value = '';
		}
	}

	collapseSuggestions() {
		this.inputText.nativeElement.value = this.getSelectedValue(this.selectedValue);
		this.suggestionsOpen = false;
	}

	getSelectedValue(value) {
		let c = this.config.getIn(['selectedValConfig', 'text']);
		let result = c && Map.isMap(value) ? value.get(c) : value;
		return result ? result : this.config.get('defaultValue');
	}


	getSuggestionValue(value) {
		let c = this.config.getIn(['suggestionsConfig', 'text']);
		return c && Map.isMap(value) ? value.get(c) : value;
	}

}
