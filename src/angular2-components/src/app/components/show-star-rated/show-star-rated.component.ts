import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-show-star-rated',
  templateUrl: './show-star-rated.component.html',
  styleUrls: ['./show-star-rated.component.scss']
})
export class ShowStarRatedComponent implements OnInit {
	@Input() reviewPoint:any;

  constructor() { }

  ngOnInit() {
  }

}
