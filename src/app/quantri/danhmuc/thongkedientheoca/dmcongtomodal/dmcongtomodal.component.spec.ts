import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmcongtomodalComponent } from './dmcongtomodal.component';

describe('DmcongtomodalComponent', () => {
  let component: DmcongtomodalComponent;
  let fixture: ComponentFixture<DmcongtomodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcongtomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcongtomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
