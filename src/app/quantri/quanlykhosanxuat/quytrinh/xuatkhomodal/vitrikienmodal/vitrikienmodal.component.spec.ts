import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { VitrikienmodalComponent } from './vitrikienmodal.component';

describe('VitrikienmodalComponent', () => {
  let component: VitrikienmodalComponent;
  let fixture: ComponentFixture<VitrikienmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VitrikienmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitrikienmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
