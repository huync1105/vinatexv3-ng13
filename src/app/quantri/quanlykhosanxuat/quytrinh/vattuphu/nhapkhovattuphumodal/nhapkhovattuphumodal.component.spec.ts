import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhapkhovattuphumodalComponent } from './nhapkhovattuphumodal.component';

describe('NhapkhovattuphumodalComponent', () => {
  let component: NhapkhovattuphumodalComponent;
  let fixture: ComponentFixture<NhapkhovattuphumodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhovattuphumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhovattuphumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
