import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivestockModalComponent } from './livestock-modal.component';

describe('LivestockModalComponent', () => {
  let component: LivestockModalComponent;
  let fixture: ComponentFixture<LivestockModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivestockModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
