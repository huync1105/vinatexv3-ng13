import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalkehoachkinhdoanhthangComponent } from './modalkehoachkinhdoanhthang.component';

describe('ModalkehoachkinhdoanhthangComponent', () => {
  let component: ModalkehoachkinhdoanhthangComponent;
  let fixture: ComponentFixture<ModalkehoachkinhdoanhthangComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalkehoachkinhdoanhthangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalkehoachkinhdoanhthangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
