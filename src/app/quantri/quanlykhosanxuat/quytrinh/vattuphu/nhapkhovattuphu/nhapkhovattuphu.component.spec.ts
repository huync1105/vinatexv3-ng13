import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhapkhovattuphuComponent } from './nhapkhovattuphu.component';

describe('NhapkhovattuphuComponent', () => {
  let component: NhapkhovattuphuComponent;
  let fixture: ComponentFixture<NhapkhovattuphuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhovattuphuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhovattuphuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
