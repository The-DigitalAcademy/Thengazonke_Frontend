import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedModalComponent } from './breed-modal.component';

describe('BreedModalComponent', () => {
  let component: BreedModalComponent;
  let fixture: ComponentFixture<BreedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreedModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
