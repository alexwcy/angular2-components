import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStarRatedComponent } from './show-star-rated.component';

describe('ShowStarRatedComponent', () => {
  let component: ShowStarRatedComponent;
  let fixture: ComponentFixture<ShowStarRatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStarRatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStarRatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
