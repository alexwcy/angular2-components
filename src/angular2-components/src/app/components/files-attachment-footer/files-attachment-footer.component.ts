import { ReplaySubject } from 'rxjs/Rx';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { List } from 'immutable';

export interface IFile {
	url: string;
	file?: any;
	size?: any;
}

@Component({
	selector: 'app-files-attachment-footer',
	templateUrl: './files-attachment-footer.component.html',
	styleUrls: ['./files-attachment-footer.component.scss']
})
export class FilesAttachmentFooterComponent implements OnInit, OnDestroy {
	@ViewChild('inputFileEl') fileInputEl: ElementRef;

	addedFiles: List<IFile> = List([]);
	addedFilesSize = 0;
	@Input() fileSizeLimit = 20; // In Mbs

	@Input('attachments') attachments: ReplaySubject<any>;

	@Output('fileAdded') fileAddedOp: EventEmitter<any> = new EventEmitter();
	@Output('fileRemoved') fileRemovedOp: EventEmitter<any> = new EventEmitter();
	@Output('fileSizeExceeded') fileSizeExceededOp: EventEmitter<any> = new EventEmitter();

	constructor() { }

	ngOnInit() {
		this.attachments.subscribe(({type,file}) =>{
			if(type ==='ADD'){
				this.addedFiles = this.addedFiles.unshift(file);
				this.addedFilesSize += this.getFileSizeInMB(file.size);
			} else if(type === 'DELETE'){
				const index =this.addedFiles.indexOf(file);
				if(index > -1){
					this.addedFiles=this.addedFiles.delete(index);
					this.addedFilesSize -= this.getFileSizeInMB(file.size);
				}
			}
		});
	}
	decodeURIComponent(encodedURI) {
		return decodeURIComponent(encodedURI);
	}
	fileAdded(e) {
		let files = Array.prototype.slice.call(e.target.files);
		try {
			let newFileSize = 0;
			files.forEach(file => {
				newFileSize = this.addedFilesSize + this.getFileSizeInMB(file.size);
				if(this.fileSizeLimit && newFileSize > this.fileSizeLimit) {
					let exceedSize = newFileSize - this.fileSizeLimit;
					this.fileSizeExceededOp.emit(exceedSize);
					return;
				}
				const dataFile:IFile ={
					url: window.URL.createObjectURL(file),
					file,
					size: file.size
				};
				this.fileAddedOp.emit(dataFile);

			});
		} catch (e) {
			console.log('Error Adding Images', e);
		}
	}

	getFileSizeInMB(bytes) {
		return parseFloat((parseInt(bytes,10) / (1024*1024)).toFixed(2));
	}

	removeAddedFile(index: number) {
		this.fileInputEl.nativeElement.value = null;
		this.fileRemovedOp.emit({ file: this.addedFiles.get(index), index });
	}

	triggerFileInputClick(e) {
		setTimeout(() => {
			this.fileInputEl.nativeElement.click();
		});
	}
	getAttachmentName(attachment) {
		if (attachment.file) {
			return attachment.file.name;
		} else {
			return "";
		}
	}
	getAttachmentUrl(attachment) {
		if (attachment && attachment.url) {
			return attachment.url;
		} else {
			return "";
		}
	}
	isPdf(fileType) {
		return fileType && fileType.trim().toLowerCase() === 'pdf';
	}
	isExcel(fileType) {
		return fileType && (fileType.trim().toLowerCase() === 'xls' || fileType.trim().toLowerCase() === 'xlsx');
	}
	isCsv(fileType) {
		return fileType && fileType.trim().toLowerCase() === 'csv';
	}
	isWord(fileType) {
		return (fileType && fileType.trim().toLowerCase() === 'doc' || fileType.trim().toLowerCase() === 'docx');
	}
	isPng(fileType) {
		return fileType && (fileType.trim().toLowerCase() === 'png' || fileType.trim().toLowerCase() === 'gif' || fileType.trim().toLowerCase() === 'bmp');
	}
	isJpg(fileType) {
		return fileType && (fileType.trim().toLowerCase() === 'jpg' || fileType.trim().toLowerCase() === 'jpeg');
	}

	ngOnDestroy() {
		this.addedFilesSize = 0;
		this.addedFiles = this.addedFiles.clear();
	}

}
