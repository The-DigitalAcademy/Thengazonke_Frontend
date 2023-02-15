import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mylivestock22Component } from './mylivestock22.component';

describe('Mylivestock22Component', () => {
  let component: Mylivestock22Component;
  let fixture: ComponentFixture<Mylivestock22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Mylivestock22Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Mylivestock22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
