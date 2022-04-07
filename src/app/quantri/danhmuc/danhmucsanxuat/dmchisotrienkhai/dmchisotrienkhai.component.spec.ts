import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmchisotrienkhaiComponent } from './dmchisotrienkhai.component';

describe('DmchisotrienkhaiComponent', () => {
  let component: DmchisotrienkhaiComponent;
  let fixture: ComponentFixture<DmchisotrienkhaiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmchisotrienkhaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmchisotrienkhaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
