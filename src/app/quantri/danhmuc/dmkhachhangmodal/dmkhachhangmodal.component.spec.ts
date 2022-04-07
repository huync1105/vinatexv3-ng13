import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DmkhachhangmodalComponent } from './dmkhachhangmodal.component';

describe('DmkhachhangmodalComponent', () => {
  let component: DmkhachhangmodalComponent;
  let fixture: ComponentFixture<DmkhachhangmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmkhachhangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmkhachhangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
