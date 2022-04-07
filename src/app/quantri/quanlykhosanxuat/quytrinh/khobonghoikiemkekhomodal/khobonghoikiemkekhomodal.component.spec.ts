import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KhobonghoikiemkekhomodalComponent } from './khobonghoikiemkekhomodal.component';

describe('KhobonghoikiemkekhomodalComponent', () => {
  let component: KhobonghoikiemkekhomodalComponent;
  let fixture: ComponentFixture<KhobonghoikiemkekhomodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KhobonghoikiemkekhomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhobonghoikiemkekhomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
