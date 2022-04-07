import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalkehoachkinhdoanhtheodoiComponent } from './modalkehoachkinhdoanhtheodoi.component';

describe('ModalkehoachkinhdoanhtheodoiComponent', () => {
  let component: ModalkehoachkinhdoanhtheodoiComponent;
  let fixture: ComponentFixture<ModalkehoachkinhdoanhtheodoiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalkehoachkinhdoanhtheodoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalkehoachkinhdoanhtheodoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
