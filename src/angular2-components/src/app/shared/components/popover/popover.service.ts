import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

@Injectable()
export class PopoverService {

  private subject = new Subject<any>();
  constructor() {}

  closePopover() {
    this.subject.next();
  }

  getPopoverClose(): Observable<any> {
    return this.subject.asObservable();
  }
}
