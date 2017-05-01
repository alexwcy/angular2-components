import {
	Component,
	OnInit,
	ElementRef,
	ViewChild,
	ViewChildren,
	QueryList,
	Input,
	Output,
	EventEmitter,
	ViewEncapsulation
} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { List } from 'immutable';

interface IDataConfig {
	text: string,
	value?: string,
	icon?: string,
}

@Component({
	selector: 'app-chooser-plain',
	templateUrl: './chooser-plain.component.html',
	styleUrls: ['./chooser-plain.component.scss']
})
export class ChooserPlainComponent implements OnInit {

	@Input() labelText: string;
	@Input('suggestionsData') suggestionsData: List<any> = List([]);
	@Input() placeholder: string = 'Select';
	@Input() defaultSelection: string = 'Select';
	@Input() hideLabel: boolean = false;
	@Input() config: IDataConfig;
	@Input() isDisabled: boolean;
	@Input('selectedItem') selectedItem: any;

	@Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();

	selectedValue: any;
	selectedIndex: number = 0;
	suggestionItemsArr: Array<ElementRef> = [];

	blurEventListener: any;
	blurEventElement: any;

	constructor(private el: ElementRef) { }
	@ViewChild('box') selectBox: ElementRef;
	@ViewChild('chooserHolder') chooserHolder: ElementRef;
	@ViewChild('suggestions') public suggestions: ElementRef;
	@ViewChildren('suggestion') public suggestionItems: QueryList<ElementRef>;

	ngOnInit() {

		this.selectedValue = this.placeholder;
	}
	ngAfterViewInit() {
		var self = this;
		this.suggestionItems.changes.subscribe(r => {
			self.suggestionItemsArr = this.suggestionItems.toArray();
		})
		self.suggestionItemsArr = this.suggestionItems.toArray();

		this.suggestions.nativeElement.addEventListener('keydown', function (e) {
			e.stopPropagation();
			if (e.keyCode === 38) {
				e.preventDefault();
				if (self.selectedIndex === 0) {
					self.selectedIndex = self.suggestionItemsArr.length - 1;
					self.selectSuggestionItem(self.selectedIndex);
				} else {
					self.selectSuggestionItem(--self.selectedIndex);
				}
			}
			else if (e.keyCode === 40) {
				e.preventDefault();
				if (self.selectedIndex === self.suggestionItemsArr.length - 1) {
					self.selectedIndex = 0;
					self.selectSuggestionItem(self.selectedIndex);
				} else {
					self.selectSuggestionItem(++self.selectedIndex);
				}
			}
			else if (e.keyCode === 27) {
				e.preventDefault();
				self.collapseSuggestions();
			}
		});
	}

	selectSuggestionItem(idx) {
		let self = this;

		if (this.suggestionItemsArr.length === 0) {
			console.error('Oops! The Suggestions Array length is zero');
			return;
		}
		this.blurEventElement && this.blurEventElement.removeEventListener('blur', this.blurEventListener);

		this.suggestionItemsArr.forEach(i => {
			i.nativeElement.removeAttribute('tabindex');
		});

		this.selectedValue = this.suggestionsData[idx];
		this.suggestionItemsArr[idx].nativeElement.tabIndex = 0;
		setTimeout(function () {
			this.suggestionItemsArr[idx].nativeElement.focus();
			this.blurEventElement = this.suggestionItemsArr[idx].nativeElement;
			this.blurEventListener = this.suggestionItemsArr[idx].nativeElement.addEventListener('blur', function (e) {
				self.collapseSuggestions(e);
			})
		}.bind(this));



	}

	toggleSuggestions() {
		if (this.isDisabled === true)
			return;
		if (this.suggestions.nativeElement.classList.contains('expanded')) {
			this.collapseSuggestions();
		} else {
			this.selectBox.nativeElement.tabIndex = -1;
			this.suggestions.nativeElement.classList.add('expanded');
			if (this.shouldBeShownAbove()) {
				this.suggestions.nativeElement.classList.add('up');
			} else {
				this.suggestions.nativeElement.classList.remove('up');
			}
			this.selectSuggestionItem(this.selectedIndex);

		}
	}

	shouldBeShownAbove() {
		if ((<any>window.innerHeight - this.chooserHolder.nativeElement.offsetTop) < this.suggestions.nativeElement.offsetHeight) {
			return true;
		}
		return false;
	}

	itemChosen(s: any, i: number, e?: any) {
		if (e) {
			e.preventDefault();
			this.blurEventElement && this.blurEventElement.removeEventListener('blur', this.blurEventListener);
		}
		this.itemSelected.emit(s);
		this.selectedValue = s;
		this.selectedIndex = i;
		this.collapseSuggestions();
		this.suggestionItemsArr[i].nativeElement.tabIndex = -1;
	}
	collapseSuggestions(el?: any) {
		this.selectBox.nativeElement.tabIndex = 0;
		if (this.suggestionItemsArr.length > 0 && this.suggestionItemsArr[this.selectedIndex].nativeElement.tabIndex == 0) {
			this.suggestionItemsArr[this.selectedIndex].nativeElement.tabIndex = -1;
		}
		this.suggestions.nativeElement.classList.remove('expanded');
	}

}
