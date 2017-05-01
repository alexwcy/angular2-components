import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
	selector: 'app-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
	public title: string;
	public message: string;
	public titleAlign?: string;
	public messageAlign?: string;
	public btnOkText?: string;
	public btnCancelText?: string;
	public showCancel = true;
	constructor(public dialogRef: MdDialogRef<ConfirmationDialogComponent>) { }

	ngOnInit() {
	}

	closeDialog() {
		this.dialogRef.close();
	}

}
