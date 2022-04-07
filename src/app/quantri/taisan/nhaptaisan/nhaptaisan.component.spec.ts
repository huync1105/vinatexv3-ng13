import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhaptaisanComponent } from './nhaptaisan.component';

describe('NhaptaisanComponent', () => {
  let component: NhaptaisanComponent;
  let fixture: ComponentFixture<NhaptaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhaptaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhaptaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
