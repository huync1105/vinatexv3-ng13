import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalchiphibanhangtheonamComponent } from './modalchiphibanhangtheonam.component';

describe('ModalchiphibanhangtheonamComponent', () => {
  let component: ModalchiphibanhangtheonamComponent;
  let fixture: ComponentFixture<ModalchiphibanhangtheonamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalchiphibanhangtheonamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalchiphibanhangtheonamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
