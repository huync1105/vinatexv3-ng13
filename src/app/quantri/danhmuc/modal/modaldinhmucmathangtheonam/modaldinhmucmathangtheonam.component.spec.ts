import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldinhmucmathangtheonamComponent } from './modaldinhmucmathangtheonam.component';

describe('ModaldinhmucmathangtheonamComponent', () => {
  let component: ModaldinhmucmathangtheonamComponent;
  let fixture: ComponentFixture<ModaldinhmucmathangtheonamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldinhmucmathangtheonamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldinhmucmathangtheonamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
