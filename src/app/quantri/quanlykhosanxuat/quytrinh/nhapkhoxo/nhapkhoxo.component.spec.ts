import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhapkhoxoComponent } from './nhapkhoxo.component';

describe('NhapkhoxoComponent', () => {
  let component: NhapkhoxoComponent;
  let fixture: ComponentFixture<NhapkhoxoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhoxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhoxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
