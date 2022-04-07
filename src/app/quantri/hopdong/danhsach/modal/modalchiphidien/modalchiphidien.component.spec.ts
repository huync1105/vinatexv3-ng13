import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalchiphidienComponent } from './modalchiphidien.component';

describe('ModalchiphidienComponent', () => {
  let component: ModalchiphidienComponent;
  let fixture: ComponentFixture<ModalchiphidienComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalchiphidienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalchiphidienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
