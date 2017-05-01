import { Component, OnInit, Input, ElementRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { List, Map, fromJS, is, Record } from 'immutable';

const KEY_CODES = {
	BACKSPACE: 8,
	TAB: 9,
	ENTER: 13,
	ESC: 27,
	SPACE: 32,
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
	token: '@'
});

@Component({
	selector: 'app-auto-suggest-textarea',
	templateUrl: './auto-suggest-textarea.component.html',
	styleUrls: ['./auto-suggest-textarea.component.scss'],
	host: {
		style: 'width: 100%;display: inline-block;'
	}
})
export class AutoSuggestTextareaComponent implements OnInit {

	suggestions: List<any>;
	suggestionsOriginal: List<any>;
	searchText: string = '';

	@Input() config: Record<string, any> = new ConfigRecord();

	@Input('suggestions') set setSuggestions(suggestions: List<any>) {
		this.suggestions = suggestions;
		this.suggestionsOriginal = suggestions;
	};
	@Input('selectedValue') selectedValue: Map<string, any> | string | number;

	@Output('suggestionChosen') suggestionChosen: EventEmitter<any> = new EventEmitter();
	@Output('textChanged') textChanged: EventEmitter<any> = new EventEmitter();

	selectedIndex: number = -1;
	suggestionsOpen: boolean = false;
	docHandler: Function;

	@ViewChild('suggestionsHolder') suggestionsHolder: ElementRef;
	@ViewChild('inputBox') inputBox: ElementRef;
	@ViewChild('inputText') public inputText: ElementRef;

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
		} else {
			this.suggestions = List.of(['No results found']);
		}
		this.suggestionsOpen = true;

	}

	ngOnInit() {

	}

	inputTextKeyDown(e: KeyboardEvent) {
		e.stopPropagation();
		switch (e.which) {
			case KEY_CODES.LEFT:
			case KEY_CODES.UP: {
				// e.preventDefault();
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
					// e.preventDefault();
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
				if (this.suggestionsOpen) {
					e.preventDefault();
					this.chooseSuggestion(this.selectedIndex);
				}
				break;

			case KEY_CODES.ESC:
				this.suggestionsOpen && this.collapseSuggestions();
				break;

			case KEY_CODES.SPACE:
				this.suggestionsOpen && this.collapseSuggestions();
				break;
			default:
				if (e.key === this.config.get('token')) {
					this.openSuggestions();
				} else {
					if (this.suggestionsOpen) {
						if (this.isCharacterKeyPress(e)) {
							this.searchText += e.key;
						} else {
							if (e.which === KEY_CODES.BACKSPACE) {
								if ((<any>e.target).value.slice(-1) === this.config.get('token')) {
									this.collapseSuggestions();
								}
								if (this.searchText.length > 0) {
									this.searchText = this.searchText.slice(0, -1);
								}
							}
						}
						console.log(this.searchText);
						this.filterSuggestions(this.searchText);
					}
				}
		}
	}
	inputTextKeyUp(e: KeyboardEvent) {
		this.sendTextChangedOutput((<any>e.target).value);
	}

	sendTextChangedOutput(txt) {
		this.textChanged.emit(txt);
	}

	isCharacterKeyPress(evt: KeyboardEvent) {
		if (typeof evt.which == "undefined") {
			// This is IE, which only fires keypress events for printable keys
			return true;
		} else if (typeof evt.which == "number" && evt.which > 0) {
			// In other browsers except old versions of WebKit, evt.which is
			// only greater than zero if the keypress is a printable key.
			// We need to filter out backspace and ctrl/alt/meta key combinations
			return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which !== 8 && evt.which !== 16;
		}
		return false;
	}

	chooseSuggestion(index) {
		let outputItem = Map({
			item: this.suggestions.get(index),
			index
		});
		this.suggestionChosen.emit(outputItem);
		if (this.config.get('handleSelectionInternally') === true) {
			this.inputText.nativeElement.value += this.getSelectedValue(this.getSelectedValue(this.suggestions.get(index)));
			setTimeout(() => {
				this.sendTextChangedOutput(this.inputText.nativeElement.value);
			});
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
	}

	collapseSuggestions() {
		this.searchText = '';
		this.suggestionsOpen = false;
	}

	getSelectedValue(value) {
		let c = this.config.getIn(['selectedValConfig', 'text']);
		return c && Map.isMap(value) ? value.get(c) : value;
	}


	getSuggestionValue(value) {
		let c = this.config.getIn(['suggestionsConfig', 'text']);
		return c && Map.isMap(value) ? value.get(c) : value;
	}

}
