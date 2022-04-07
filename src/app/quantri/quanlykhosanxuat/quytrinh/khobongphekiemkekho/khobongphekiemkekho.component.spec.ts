import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KhobongphekiemkekhoComponent } from './khobongphekiemkekho.component';

describe('KhobongphekiemkekhoComponent', () => {
  let component: KhobongphekiemkekhoComponent;
  let fixture: ComponentFixture<KhobongphekiemkekhoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KhobongphekiemkekhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhobongphekiemkekhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
