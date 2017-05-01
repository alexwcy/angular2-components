import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-playstore-version',
    templateUrl: './playstore-version.component.html',
    styleUrls: ['./playstore-version.component.scss']
})
export class PlaystoreVersionComponent implements OnInit {

    review;
    isCustomerReview;

    constructor() { }

    ngOnInit() {
    }

}
