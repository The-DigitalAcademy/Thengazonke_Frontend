import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('LivestocksComponent', () => {
  let component: LivestocksComponent;
  let fixture: ComponentFixture<LivestocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivestocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
