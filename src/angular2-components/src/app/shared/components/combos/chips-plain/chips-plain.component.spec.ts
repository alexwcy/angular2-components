import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsPlainComponent } from './chips-plain.component';

describe('ChipsPlainComponent', () => {
  let component: ChipsPlainComponent;
  let fixture: ComponentFixture<ChipsPlainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsPlainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsPlainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
