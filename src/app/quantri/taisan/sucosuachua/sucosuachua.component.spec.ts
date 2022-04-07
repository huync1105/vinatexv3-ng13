import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { SucosuachuaComponent } from './sucosuachua.component';

describe('SucosuachuaComponent', () => {
  let component: SucosuachuaComponent;
  let fixture: ComponentFixture<SucosuachuaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SucosuachuaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucosuachuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
