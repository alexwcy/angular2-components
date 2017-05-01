import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-editable-text',
	templateUrl: './editable-text.component.html',
	styleUrls: ['./editable-text.component.scss']
})
export class EditableTextComponent implements OnInit {
	@Input() textContent: any;
	@Input() isActioable: any;
	textContentCopy: any;

	@Output() submitEvent = new EventEmitter<any>();


	showCntrls = false;

	constructor() { }

	ngOnInit() {
		this.textContentCopy = this.textContent;
	}


	showControls() {
		this.showCntrls = true;
	}
	ruleblur($event) {
		this.showCntrls = false;
		if (!this.isActioable) {
			this.submitEvent.emit(this.textContent);
		}

	}

	submitevent($event) {
		this.submitEvent.emit(this.textContent);
		this.textContent = null;
	}
	cancelevent($event) {
		this.showCntrls = false;
		this.textContent = this.textContentCopy;
	}
}
