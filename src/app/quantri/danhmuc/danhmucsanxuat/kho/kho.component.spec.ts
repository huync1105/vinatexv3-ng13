import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KhoComponent } from './kho.component';

describe('KhoComponent', () => {
  let component: KhoComponent;
  let fixture: ComponentFixture<KhoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
