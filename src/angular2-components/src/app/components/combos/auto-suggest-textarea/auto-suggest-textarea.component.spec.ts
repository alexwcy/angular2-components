import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSuggestTextareaComponent } from './auto-suggest-textarea.component';

describe('AutoSuggestTextareaComponent', () => {
  let component: AutoSuggestTextareaComponent;
  let fixture: ComponentFixture<AutoSuggestTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoSuggestTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSuggestTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
