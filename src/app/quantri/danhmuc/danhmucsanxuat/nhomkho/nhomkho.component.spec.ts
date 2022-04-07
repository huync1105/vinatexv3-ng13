import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhomkhoComponent } from './nhomkho.component';

describe('NhomkhoComponent', () => {
  let component: NhomkhoComponent;
  let fixture: ComponentFixture<NhomkhoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhomkhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhomkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
