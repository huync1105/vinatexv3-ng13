import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KhobonghoikiemkekhoComponent } from './khobonghoikiemkekho.component';

describe('KhobonghoikiemkekhoComponent', () => {
  let component: KhobonghoikiemkekhoComponent;
  let fixture: ComponentFixture<KhobonghoikiemkekhoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KhobonghoikiemkekhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhobonghoikiemkekhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
