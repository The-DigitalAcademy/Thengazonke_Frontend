import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MylivestockComponent } from './mylivestock.component';

describe('MylivestockComponent', () => {
  let component: MylivestockComponent;
  let fixture: ComponentFixture<MylivestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MylivestockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MylivestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
