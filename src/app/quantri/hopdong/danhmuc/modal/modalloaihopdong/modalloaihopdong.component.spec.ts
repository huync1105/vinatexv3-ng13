import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalloaihopdongComponent } from './modalloaihopdong.component';

describe('ModalloaihopdongComponent', () => {
  let component: ModalloaihopdongComponent;
  let fixture: ComponentFixture<ModalloaihopdongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalloaihopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalloaihopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
