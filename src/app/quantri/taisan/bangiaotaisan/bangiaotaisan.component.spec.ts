import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { BangiaotaisanComponent } from './bangiaotaisan.component';

describe('BangiaotaisanComponent', () => {
  let component: BangiaotaisanComponent;
  let fixture: ComponentFixture<BangiaotaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BangiaotaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BangiaotaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
