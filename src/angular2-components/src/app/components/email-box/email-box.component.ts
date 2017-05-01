import { ViewChild } from '@angular/core/src/metadata/di';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { ReplaySubject, Subject, Subscription } from 'rxjs/Rx';
import { fromJS, Map, List, Record } from 'immutable';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CannedResponseComponent } from '../canned-response/canned-response.component';
import { IFile } from '../files-attachment-footer/files-attachment-footer.component';


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export interface IChipsConfig {
	text: string;
	value?: string;
}

export const EmailBoxInputDataRecord = Record({
	fromSelected: null,
	fromList: List(),
	toSelected: List(),
	toList: List(),
	fromChipConfig: null,
	fromSuggestionsConfig: null,
	toChipConfig: null,
	toSuggestionsConfig: null,
	body: 'Type Here',
	ccSelected: List(),
	bccSelected: List(),
	attachmentList: List(), //  this is for sending the attachments to server in case of email.
	hellipContent: '',
	hellipEnabled: false,
	labelText: '',
	labelTextEnabled:true,
	subject: '',
	subjectEnabled: true,
});

@Component({
	selector: 'app-email-box',
	templateUrl: './email-box.component.html',
	styleUrls: ['./email-box.component.scss']
})
export class EmailBoxComponent implements OnInit, OnDestroy {
	@Input() editorId: string;
	@Input() cannedResponses: any; //  canned response is a subject
	@Input() statusMessage: string = ''; // messages like saving draft ,sending email... etc.
	@Input('attachments') attachments = new ReplaySubject();
	@Input() isSendDisabled = false; // to enable or disable send button
	data: Record<string, any> = EmailBoxInputDataRecord;
	toSelected: List<any> = List();
	fromSelected: Map<string, any> = null;
	ccSelected: List<any> = List();
	bccSelected: List<any> = List();
	body: string;
	subject: string;
	labelText: string;
	hellipClicked = false;
	cannedResponseSelected$: Subject<any> = new Subject();
	searchCannedResponseSubject$: Subject<any> = new Subject();
	attachmentSubscription: Subscription;

	@ViewChild('editorComponent') editorComponent;

	@Input('dataInput') set dataInput(data: Record<string, any>) {
		this.data = data;
		['toSelected', 'fromSelected', 'ccSelected', 'bccSelected', 'body', 'labelText', 'subject'].forEach((verb: string) => {
			this[verb] = data.get(verb);
		});
	};

	@Output() outputEventEmitter: EventEmitter<any> = new EventEmitter();
	@Input() outputEventSubject: Subject<any>;

	isCCOpen: boolean;
	isBCCOpen: boolean;

	constructor( @Optional() public dialogRef: MdDialogRef<EmailBoxComponent>, private dialog: MdDialog) { }

	ngOnInit() {
			if(this.ccSelected.size>0){
					this.isCCOpen = true;
			}
			if(this.bccSelected.size>0){
					this.isBCCOpen = true;
			}
			if (this.dialogRef) {
				this.dialogRef.afterClosed().do(() => {
					this.discardEmail();
				});
			}
			this.searchCannedResponseSubject$.subscribe(res => {
				this.emitOutput('searchCannedResponse', res, this.dialogRef);
			});
			this.attachmentSubscription = this.attachments.subscribe(({type,attachment,index,fromDraft}) => {
				if(type === 'ADD' && ! fromDraft){
					const attachmentList = this.data.get('attachmentList');
					this.data = this.data.set('attachmentList',attachmentList.unshift(attachment));

				} else if(type === 'DELETE'){
					let  attachmentList = this.data.get('attachmentList');
					attachmentList = attachmentList.delete(index);
					this.data = this.data.set('attachmentList',attachmentList);
				}
		});
    }

	ngOnDestroy() {
		if (this.dialogRef) {
			this.discardEmail();
		}
		if (this.attachmentSubscription) {
			this.attachmentSubscription.unsubscribe();
		}
	}

	fromChanged(value) {
		this.fromSelected = value;
	}
	getBrandImage() {
		return '';
	}
	emailChosen(bucket, values) {
		let selectedVal = values.last();
		if (!Map.isMap(selectedVal)) {
			if (!EMAIL_REGEX.test(selectedVal)) {
				this.invalidEmail({bucket,selectedVal});
				return;
			}
			selectedVal = Map({
				[this.data.getIn(['toChipConfig']).text || this.data.getIn(['toSuggestionsConfig']).text]: selectedVal
			});

		}
		console.log(selectedVal);
		this[`${bucket}Selected`] = this[`${bucket}Selected`].push(selectedVal);
	}

	emailRemoved(bucket, value) {
		this[`${bucket}Selected`] = this[`${bucket}Selected`].delete(value.index);
	}

	invalidEmail(data) {
		this.emitOutput('invalidEmail',data);
	}

	attachmentAdded(file: IFile) {
		// this.attachments = this.attachments.push(file);
		this.emitOutput('attachmentAdded', file);
	}

	attachmentRemoved(eventData) {
		// this.attachments = this.attachments.delete(eventData.index);
		this.emitOutput('attachmentRemoved', eventData);
	}

	attachmentSizeExceeded(exceedSize) {
		this.emitOutput('fileSizeExceeded', exceedSize);
	}

	clearEmails(bucket, visibilityFlag) {
		this[visibilityFlag] = false;
		this[`${bucket}Selected`] = this[`${bucket}Selected`].clear();
	}
	tinymceEditorKeyup(content) {
		this.body = content;
	}

	emitSubject(event) {
		this.subject = event.target.value;
	}

	emitOutput(eventName: string, eventData?: any, dialogRef?: any) {
		if (this.outputEventSubject) {
			this.outputEventSubject.next({ type: eventName, data: eventData, dialogRef: dialogRef });
		} else {
			this.outputEventEmitter.emit({ type: eventName, data: eventData, dialogRef: dialogRef });
		}
	}

	openCannedResponseDialog() {
		this.dialog.open(CannedResponseComponent, {
			width: '70%',
			height: '70%',
			data: {
				cannedResponseSelected: this.cannedResponseSelected$,
				cannedResponses: this.cannedResponses,
				searchCannedResponseSubject: this.searchCannedResponseSubject$
			}
		});
	}

	sendEmail(isDraft?: boolean, options?) {
		if (!this.editorComponent && !this.editorComponent.editor) {
			return;
		}
		let data = fromJS({
			'toSelected': this.toSelected,
			'fromSelected': this.fromSelected,
			'ccSelected': this.ccSelected,
			'bccSelected': this.bccSelected,
			'attachments': this.attachments,
			'attachmentList': this.data.get('attachmentList'),
			'body': this.editorComponent.editor.getContent(),
			'subject': this.subject,
			'labelText': this.labelText,
      'options': options,
		});
		if (isDraft) {
			this.emitOutput('saveDraft', data);
		} else {
		if (data.get('toSelected').size <= 0) {
				this.emitOutput('noToAddress');
			} else {
				if (this.hellipClicked) {
					this.emitOutput('sendEmail', data, this.dialogRef);
				} else {
					data = data.set('body', `${data.get('body')}<br/><br/>${this.data.get('hellipContent')}`);
					this.emitOutput('sendEmail', data, this.dialogRef);
				}
			}
		}
	}

	saveDraft() {
		this.sendEmail(true);
	}

	discardEmail() {
		this.emitOutput('discard');
		if (this.dialogRef) {
			this.dialogRef.close();
		}
	}
	handleEditorEvents(e) {
		switch (e.type) {
			case 'blur':
					this.sendEmail(true);
				break;
			case 'focus':
					this.sendEmail(true);
				break;
			default:
				break;
		}
	}
	onHellipClick() {
		if (!this.editorComponent && !this.editorComponent.editor) {
			return;
		}
		const body = this.editorComponent.editor.getContent();
		const hellipContent = this.data.get('hellipContent');
		if (this.hellipClicked) {
			const newBody = body.replace(hellipContent,'');
			this.data = this.data.set('body',newBody);
		} else {
			this.data = this.data.set('body', `${body}${hellipContent}`);
		}
		this.hellipClicked = !this.hellipClicked;
	}
	getToPlaceHolder()
	{
		if(this.toSelected.size>0){
			return "Add more";
		}
		else{
			return 'Enter To email address';
		}
	}

	getCcPlaceHolder()
	{
		if(this.ccSelected.size>0){
			return "Add more";
		}
		else{
			return 'Enter CC email address';
		}
	}
	getBccPlaceHolder()
	{
		if(this.bccSelected.size>0){
			return "Add more";
		}
		else{
			return 'Enter BCC email address';
		}
	}
}
