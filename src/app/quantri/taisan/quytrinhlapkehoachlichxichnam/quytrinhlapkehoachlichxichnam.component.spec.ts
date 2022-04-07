import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { QuytrinhlapkehoachlichxichnamComponent } from './quytrinhlapkehoachlichxichnam.component';

describe('QuytrinhlapkehoachlichxichnamComponent', () => {
  let component: QuytrinhlapkehoachlichxichnamComponent;
  let fixture: ComponentFixture<QuytrinhlapkehoachlichxichnamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuytrinhlapkehoachlichxichnamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuytrinhlapkehoachlichxichnamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
