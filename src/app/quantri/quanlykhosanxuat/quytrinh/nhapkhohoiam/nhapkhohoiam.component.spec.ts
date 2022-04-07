import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhapkhohoiamComponent } from './nhapkhohoiam.component';

describe('NhapkhohoiamComponent', () => {
  let component: NhapkhohoiamComponent;
  let fixture: ComponentFixture<NhapkhohoiamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhohoiamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhohoiamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
