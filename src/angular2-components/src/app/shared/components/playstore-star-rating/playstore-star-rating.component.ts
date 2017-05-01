import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-playstore-star-rating',
    templateUrl: './playstore-star-rating.component.html',
    styleUrls: ['./playstore-star-rating.component.scss']
})
export class PlaystoreStarRatingComponent implements OnInit {

    @Input() starRating: any;
    constructor() { }

    ngOnInit() {
    }

}
