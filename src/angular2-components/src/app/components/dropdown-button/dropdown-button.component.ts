import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { DropdownComponent } from './../dropdown/dropdown.component';

const OPTIONS = [`Send & set status to Pending`, `Send & set status to Awaiting Response`, `Send & set status to Resolved`];
@Component({
	selector: 'app-dropdown-button',
	templateUrl: './dropdown-button.component.html',
	styleUrls: ['./dropdown-button.component.scss'],
})
export class DropdownButtonComponent implements OnInit {

	@ViewChild(DropdownComponent) dropdownComponent: DropdownComponent;

	@Input() buttonText = 'Send';
	@Input() options: Array<string> = OPTIONS;
	@Input() disabled = false;
	@Input() isLoading: boolean = false;

	@Output() buttonClicked: EventEmitter<any> = new EventEmitter();
	@Output() optionClicked: EventEmitter<any> = new EventEmitter();
	constructor() { }

	ngOnInit() {

	}

	chooseOption(event) {
		this.dropdownComponent.collapseSuggestions();
		this.optionClicked.emit(event);
	}
}
