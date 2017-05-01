/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OdTableComponent } from './od-table.component';

describe('OdTableComponent', () => {
  let component: OdTableComponent;
  let fixture: ComponentFixture<OdTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
