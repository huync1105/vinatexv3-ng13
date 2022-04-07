import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KhobongphekiemkekhomodalComponent } from './khobongphekiemkekhomodal.component';

describe('KhobongphekiemkekhomodalComponent', () => {
  let component: KhobongphekiemkekhomodalComponent;
  let fixture: ComponentFixture<KhobongphekiemkekhomodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KhobongphekiemkekhomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhobongphekiemkekhomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
