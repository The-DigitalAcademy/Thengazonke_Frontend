import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableLivestockComponent } from './available-livestock.component';

describe('AvailableLivestockComponent', () => {
  let component: AvailableLivestockComponent;
  let fixture: ComponentFixture<AvailableLivestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableLivestockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableLivestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
