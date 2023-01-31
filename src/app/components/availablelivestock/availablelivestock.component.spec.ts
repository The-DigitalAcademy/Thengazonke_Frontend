import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablelivestockComponent } from './availablelivestock.component';

describe('AvailablelivestockComponent', () => {
  let component: AvailablelivestockComponent;
  let fixture: ComponentFixture<AvailablelivestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablelivestockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablelivestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
