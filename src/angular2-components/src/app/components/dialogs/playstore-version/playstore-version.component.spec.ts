import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaystoreVersionComponent } from './playstore-version.component';

describe('PlaystoreVersionComponent', () => {
  let component: PlaystoreVersionComponent;
  let fixture: ComponentFixture<PlaystoreVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaystoreVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaystoreVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
