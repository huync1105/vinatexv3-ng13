import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { LoaikhauhaoComponent } from './loaikhauhao.component';

describe('LoaikhauhaoComponent', () => {
  let component: LoaikhauhaoComponent;
  let fixture: ComponentFixture<LoaikhauhaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaikhauhaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaikhauhaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
