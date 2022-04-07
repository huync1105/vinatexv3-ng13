import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmchisotrienkhaimodalComponent } from './dmchisotrienkhaimodal.component';

describe('DmchisotrienkhaimodalComponent', () => {
  let component: DmchisotrienkhaimodalComponent;
  let fixture: ComponentFixture<DmchisotrienkhaimodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmchisotrienkhaimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmchisotrienkhaimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
