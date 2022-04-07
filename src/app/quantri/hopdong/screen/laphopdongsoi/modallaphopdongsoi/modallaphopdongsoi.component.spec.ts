import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModallaphopdongsoiComponent } from './modallaphopdongsoi.component';

describe('ModallaphopdongsoiComponent', () => {
  let component: ModallaphopdongsoiComponent;
  let fixture: ComponentFixture<ModallaphopdongsoiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModallaphopdongsoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModallaphopdongsoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
