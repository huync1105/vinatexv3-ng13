import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ImportnhapkhothanhphamComponent } from './importnhapkhothanhpham.component';

describe('ImportnhapkhothanhphamComponent', () => {
  let component: ImportnhapkhothanhphamComponent;
  let fixture: ComponentFixture<ImportnhapkhothanhphamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportnhapkhothanhphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportnhapkhothanhphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
