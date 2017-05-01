import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesAttachmentFooterComponent } from './files-attachment-footer.component';

describe('FilesAttachmentFooterComponent', () => {
  let component: FilesAttachmentFooterComponent;
  let fixture: ComponentFixture<FilesAttachmentFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesAttachmentFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesAttachmentFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
