import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooserPlainComponent } from './chooser-plain.component';

describe('ChooserPlainComponent', () => {
  let component: ChooserPlainComponent;
  let fixture: ComponentFixture<ChooserPlainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooserPlainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooserPlainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
