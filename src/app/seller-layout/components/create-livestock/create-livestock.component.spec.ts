import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLivestockComponent } from './create-livestock.component';

describe('CreateLivestockComponent', () => {
  let component: CreateLivestockComponent;
  let fixture: ComponentFixture<CreateLivestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLivestockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLivestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
