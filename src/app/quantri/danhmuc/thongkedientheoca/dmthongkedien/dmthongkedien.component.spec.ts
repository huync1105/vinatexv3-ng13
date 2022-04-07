import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmthongkedienComponent } from './dmthongkedien.component';

describe('DmthongkedienComponent', () => {
  let component: DmthongkedienComponent;
  let fixture: ComponentFixture<DmthongkedienComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmthongkedienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmthongkedienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
