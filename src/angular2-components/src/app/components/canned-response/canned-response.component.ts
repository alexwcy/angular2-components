import { Component, OnInit } from "@angular/core";
import { Subject, BehaviorSubject } from 'rxjs/Rx';
import { MdDialogRef } from '@angular/material';
import { TICKET_SOURCE_ENUM } from '../../../shared/global.constants'

@Component({
	selector: 'app-canned-response',
	templateUrl: './canned-response.component.html',
	styleUrls: ['./canned-response.component.scss'],
	host: {
		style: 'height: 100%; display: block;'
	}
})
export class CannedResponseComponent implements OnInit {

	selectedCategory: any;
	selectedSubCategory: any;
	cannedResponses: Subject<Array<any>> = new BehaviorSubject<Array<any>>([]);
	searchCannedResponseSubject: Subject<any> = new Subject();

	cr: Subject<any>; // Canned Responses Input
	cannedResponseSelected: Subject<any>;


	constructor(private dialog: MdDialogRef<CannedResponseComponent>) { }

	ngOnInit() {
		const { cannedResponses, cannedResponseSelected, searchCannedResponseSubject } = this.dialog.config.data;
		this.cr = cannedResponses;
		this.cannedResponseSelected = cannedResponseSelected;
		this.searchCannedResponseSubject = searchCannedResponseSubject;
		this.cr.subscribe(
			res => {
				if (res && res.size > 0)
					this.selectedCategory = res.first();
				if (!this.selectedCategory.get('cannedResponseSubCategory') || this.selectedCategory.get('cannedResponseSubCategory').size === 0) {
					this.setCannedResponses(this.selectedCategory.get('cannedResponse'));
				} else {
					this.setCannedResponses(this.selectedCategory.get('cannedResponseSubCategory').first().get('cannedResponse'));
				}
			}
		)

	}

	setSelectedCategory(cat) {
		this.selectedCategory = cat;
		if (!cat.get('cannedResponseSubCategory') || cat.get('cannedResponseSubCategory').size === 0) {
			this.setCannedResponses(cat.get('cannedResponse'));
		} else {
			this.setCannedResponses(cat.get('cannedResponseSubCategory').first().get('cannedResponse'));
		}
	}

	searchCannedResponse(event: KeyboardEvent) {
		let val = event.target['value'];
		if (val === '') {
			if (this.searchCannedResponseSubject) {
				this.searchCannedResponseSubject.next();
			}
			return;
		}
		if (event.keyCode === 13) {
			if (this.searchCannedResponseSubject) {
				this.searchCannedResponseSubject.next(val);
			}
		}
	}

	setSelectedSubCategory(cat) {
		this.selectedSubCategory = cat;
		this.setCannedResponses(cat.get('cannedResponse'));
	}

	setCannedResponses(cannedResponses) {
		this.cannedResponses.next(cannedResponses);
	}
	selectCannedResponse(cr) {
		if (TICKET_SOURCE_ENUM['Email'] == cr.get('source')) {
			this.cannedResponseSelected.next(cr);
		}
		else {
			this.cannedResponseSelected.next(cr.set('response', this.parseHtml(cr.get('response'))));
		}
		this.dialog.close();
	}

	closeDialog() {
		this.dialog.close();
	}
	parseHtml(str) {
		if (str) {
			str = str.replace(/<br>/gi, "\n");
			str = str.replace(/<br \/>/gi, "\n");
			str = str.replace(/<div>/gi, "\n");
			str = str.replace(/<\/div>/gi, "\n");
			str = str.replace(/<\/span>/gi, "");
			str = str.replace(/<p>/gi, "\n");
			str = str.replace(/<\/p>/gi, "\n");
			str = str.replace(/&nbsp;/gi, "");
			str = str.replace(/<div[^>]*>|<\/div>$/g, '\n');
			str = str.replace(/<span[^>]*>|<\/span>$/g, '');
			str = str.replace(/<br[^>]*>|<\/br>$/g, '\n');
			str=str.replace(/&nbsp;/gi," ");
    		str=str.replace(/&amp;/gi,"&");
		    str=str.replace(/&quot;/gi,'"');
		    str=str.replace(/&lt;/gi,'<');
		    str=str.replace(/&gt;/gi,'>');
			return str;
		}
		else {
			return null;
		}
	}
}
