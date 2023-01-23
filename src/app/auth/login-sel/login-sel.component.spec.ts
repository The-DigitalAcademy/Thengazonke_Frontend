import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSelComponent } from './login-sel.component';

describe('LoginSelComponent', () => {
  let component: LoginSelComponent;
  let fixture: ComponentFixture<LoginSelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
