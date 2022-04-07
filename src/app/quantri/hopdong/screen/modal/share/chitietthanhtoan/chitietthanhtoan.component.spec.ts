import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChitietthanhtoanComponent } from './chitietthanhtoan.component';

describe('ChitietthanhtoanComponent', () => {
  let component: ChitietthanhtoanComponent;
  let fixture: ComponentFixture<ChitietthanhtoanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietthanhtoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietthanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
