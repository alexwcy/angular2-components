import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-content-placeholder',
	templateUrl: './content-placeholder.component.html',
	styleUrls: ['./content-placeholder.component.scss'],
	host: {
		style: 'display:block'
	}
})
export class ContentPlaceholderComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
