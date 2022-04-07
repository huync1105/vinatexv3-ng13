import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KehoachnhapnguyenlieuComponent } from './kehoachnhapnguyenlieu.component';

describe('KehoachnhapnguyenlieuComponent', () => {
  let component: KehoachnhapnguyenlieuComponent;
  let fixture: ComponentFixture<KehoachnhapnguyenlieuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachnhapnguyenlieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachnhapnguyenlieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
