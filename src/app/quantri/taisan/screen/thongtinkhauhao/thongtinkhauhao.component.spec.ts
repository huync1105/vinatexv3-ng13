import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ThongtinkhauhaoComponent } from './thongtinkhauhao.component';

describe('ThongtinkhauhaoComponent', () => {
  let component: ThongtinkhauhaoComponent;
  let fixture: ComponentFixture<ThongtinkhauhaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongtinkhauhaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongtinkhauhaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
