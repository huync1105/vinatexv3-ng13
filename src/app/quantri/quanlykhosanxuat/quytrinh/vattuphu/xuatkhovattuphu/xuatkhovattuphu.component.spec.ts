import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { XuatkhovattuphuComponent } from './xuatkhovattuphu.component';

describe('XuatkhovattuphuComponent', () => {
  let component: XuatkhovattuphuComponent;
  let fixture: ComponentFixture<XuatkhovattuphuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhovattuphuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhovattuphuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
