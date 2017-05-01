import { Observable } from 'rxjs/Rx';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
export class ConfirmationDialogsService {

    constructor(private dialog: MdDialog) { }

    public confirm(title: string, message: string, viewContainerRef: ViewContainerRef, btnOkText: string ='Ok', btnCancelText: string ='Cancel'): Observable<boolean> {

        let dialogRef: MdDialogRef<ConfirmationDialogComponent>;
        let config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(ConfirmationDialogComponent, config);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.btnCancelText = btnCancelText;

        return dialogRef.afterClosed();
    }

     public confirmWithoutContainer(title: string, message: string, titleAlign: string='center', messageAlign: string='center', btnOkText: string ='Ok', btnCancelText: string ='Cancel' ): Observable<boolean> {

        let dialogRef: MdDialogRef<ConfirmationDialogComponent>;
        let config = new MdDialogConfig();
        // config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(ConfirmationDialogComponent, config);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.titleAlign = titleAlign;
        dialogRef.componentInstance.messageAlign = messageAlign;
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.btnCancelText = btnCancelText;

        return dialogRef.afterClosed();
    }
    public confirmWithoutCancel(title: string, message: string, titleAlign: string='center', messageAlign: string='center', btnOkText: string ='Ok' ): Observable<boolean> {

        let dialogRef: MdDialogRef<ConfirmationDialogComponent>;
        let config = new MdDialogConfig();
        // config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(ConfirmationDialogComponent, config);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.titleAlign = titleAlign;
        dialogRef.componentInstance.messageAlign = messageAlign;
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.showCancel = false;

        return dialogRef.afterClosed();
    }
}