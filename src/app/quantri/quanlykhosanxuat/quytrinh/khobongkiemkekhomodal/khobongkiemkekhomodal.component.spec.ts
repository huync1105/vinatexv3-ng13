import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KhobongkiemkekhomodalComponent } from './khobongkiemkekhomodal.component';

describe('KhobongkiemkekhomodalComponent', () => {
  let component: KhobongkiemkekhomodalComponent;
  let fixture: ComponentFixture<KhobongkiemkekhomodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KhobongkiemkekhomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhobongkiemkekhomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
