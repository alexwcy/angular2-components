import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	Output
} from '@angular/core';
import { Observable, Subscription, Subject, ReplaySubject } from 'rxjs/Rx';
import { TicketDetailsEmailService } from '../../../pages/ticket-details/ticket-details-email/ticket-details-email.service';
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/charmap";
import "tinymce/plugins/preview";
import "tinymce/plugins/textcolor";

declare var tinymce: any;

@Component({
	selector: 'app-tinymce-editor',
	templateUrl: './tinymce-editor.component.html',
	styleUrls: ['./tinymce-editor.component.scss']
})
export class TinymceEditorComponent implements AfterViewInit, OnDestroy {
	editorContent$: Subject<string> = new ReplaySubject();
	editorContentSubscription: Subscription;
	@Input() cannedResponseSelected: Subject<any>;
	@Input() elementId: string;
	@Output() onEditorKeyup = new EventEmitter<any>();
	@Output() onEditorEventEmitted = new EventEmitter<any>();
	@Input() PlaceholderList: any;
	interval: any;

	@Input('editorContent') set editorContent(value: string) {
		this.editorContent$.next(value);
	};

	editor: any;

	constructor(private emailService: TicketDetailsEmailService) {}

	ngAfterViewInit() {
		this.initEditor();
		this.cannedResponseSelected.subscribe(res => {
			this.editor.selection.setContent(res.get('response'));
			this.editor.focus(); // this is to fix font difference errors in canned response
		});
	}
	initEditor() {
		tinymce.init({
			selector: '#' + this.elementId,
			plugins: 'advlist autolink link lists charmap  preview table paste textcolor',
			skin_url: '../../../v2/assets/skins/lightgray',
			min_height: 200,
			mode: 'textareas',
			menubar: false,
			statusbar: false,
			paste_data_images: true,
			theme: 'modern',
			fixed_toolbar_container: '#mytoolbar',
			spellchecker_language: 'English=en',
			toolbar: "styleselect | bold italic | link image alignleft aligncenter alignright | bullist numlist outdent indent | plain_text | removeformat | unlink | forecolor | fontsizeselect | fontselect",
			fontsize_formats: '8px 10px 12px 14px 18px 24px 36px',
			browser_spellcheck: true,
			content_style: ".mce-content-body {font-family:Arial,verdana !important;}",
			forced_root_block: 'div',
			automatic_uploads: true,
			theme_advanced_fonts: `Andale Mono=andale mono,times;
				Arial=arial,helvetica,sans-serif;
				Arial Black=arial black,avant garde;
				Book Antiqua=book antiqua,palatino;
				Comic Sans MS=comic sans ms,sans-serif;
				Courier New=courier new,courier;
				Georgia=georgia,palatino;
				Helvetica=helvetica;
				Impact=impact,chicago;
				Symbol=symbol;
				Tahoma=tahoma,arial,helvetica,sans-serif;
				Terminal=terminal,monaco;
				Times New Roman=times new roman,times;
				Trebuchet MS=trebuchet ms,geneva;
				Verdana=verdana,geneva;
				Webdings=webdings;
				Wingdings=wingdings,zapf dingbats`,
			images_upload_handler: (blobInfo, success, fail) => {
				const form = new FormData();
				form.append("file", blobInfo.blob());
				this.emailService.addInlineImage(form).map(res => res.json()).subscribe((res) => {
					success(res.location);
					console.log('success inline image');
				}, (err) => {
					if (err.status === 413) {
						fail('Image size too large.');
					} else {
						fail('Error pasting content');
					}
				});
			},
			init_instance_callback: editor => {
				this.editor = editor;
				this.editor.focus();
				this.editorContentSubscription = this.editorContent$.subscribe(res => {
					this.setEditorContent(res);
				});
				editor.on('blur', (e) => {
					if (this.interval) {
						clearInterval(this.interval);
					}
					this.onEditorEventEmitted.emit({ type: 'blur', data: e });
				});
				editor.on('focus', (e) => {
					let self = this;
					this.interval = setInterval(() => {
						self.onEditorEventEmitted.emit({ type: 'focus', data: e });
					}, 30000);
				});
			}
		});
	}
	setEditorContent(text: string) {
		if (text && this.editor) {
			this.editor.setContent(text);
		} else {
			this.initEditor();
		}
	}

	ngOnDestroy() {
		tinymce.remove(this.editor);
		if (this.editorContentSubscription) {
			this.editorContentSubscription.unsubscribe();
		}
		if (this.interval) {
			clearInterval(this.interval);
		}
	}
}

