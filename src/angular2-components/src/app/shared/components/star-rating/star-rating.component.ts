import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";

@Component({
	selector: 'app-star-rating',
	templateUrl: './star-rating.component.html',
	styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

	@Input() selectedRating: number;
	@Input() readOnly: boolean = false;
	@Output() ratingChanged: EventEmitter<any> = new EventEmitter();
	constructor() { }

	ngOnInit() {
	}

	starSelected(event, val) {
		this.ratingChanged.emit(val);
	}
}
