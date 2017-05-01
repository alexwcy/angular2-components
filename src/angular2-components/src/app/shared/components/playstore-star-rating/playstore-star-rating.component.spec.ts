import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaystoreStarRatingComponent } from './playstore-star-rating.component';

describe('PlaystoreStarRatingComponent', () => {
  let component: PlaystoreStarRatingComponent;
  let fixture: ComponentFixture<PlaystoreStarRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaystoreStarRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaystoreStarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
