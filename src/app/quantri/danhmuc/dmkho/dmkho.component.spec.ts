import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmkhoComponent } from './dmkho.component';

describe('DmkhoComponent', () => {
  let component: DmkhoComponent;
  let fixture: ComponentFixture<DmkhoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmkhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
