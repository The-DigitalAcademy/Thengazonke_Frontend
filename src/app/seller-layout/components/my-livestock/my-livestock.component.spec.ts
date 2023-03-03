import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLivestockComponent } from './my-livestock.component';

describe('MyLivestockComponent', () => {
  let component: MyLivestockComponent;
  let fixture: ComponentFixture<MyLivestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLivestockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLivestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
