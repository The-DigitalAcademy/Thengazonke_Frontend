import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRateAndReviewComponent } from './admin-rate-and-review.component';

describe('AdminRateAndReviewComponent', () => {
  let component: AdminRateAndReviewComponent;
  let fixture: ComponentFixture<AdminRateAndReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRateAndReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRateAndReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
