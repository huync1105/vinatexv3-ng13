import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhmucloaitienteComponent } from './danhmucloaitiente.component';

describe('DanhmucloaitienteComponent', () => {
  let component: DanhmucloaitienteComponent;
  let fixture: ComponentFixture<DanhmucloaitienteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucloaitienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucloaitienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
