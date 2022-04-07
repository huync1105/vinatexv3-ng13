import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmkgconemodalComponent } from './dmkgconemodal.component';

describe('DmkgconemodalComponent', () => {
  let component: DmkgconemodalComponent;
  let fixture: ComponentFixture<DmkgconemodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmkgconemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmkgconemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
