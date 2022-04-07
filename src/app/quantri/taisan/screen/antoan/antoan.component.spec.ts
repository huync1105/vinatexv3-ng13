import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { AntoanComponent } from './antoan.component';

describe('AntoanComponent', () => {
  let component: AntoanComponent;
  let fixture: ComponentFixture<AntoanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AntoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
