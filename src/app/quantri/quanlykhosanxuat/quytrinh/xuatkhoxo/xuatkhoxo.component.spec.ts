import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XuatkhoxoComponent } from './xuatkhoxo.component';

describe('XuatkhoxoComponent', () => {
  let component: XuatkhoxoComponent;
  let fixture: ComponentFixture<XuatkhoxoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhoxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhoxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
