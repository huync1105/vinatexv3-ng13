import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModallaphopdongbongxoComponent } from './modallaphopdongbongxo.component';

describe('ModallaphopdongbongxoComponent', () => {
  let component: ModallaphopdongbongxoComponent;
  let fixture: ComponentFixture<ModallaphopdongbongxoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModallaphopdongbongxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModallaphopdongbongxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
