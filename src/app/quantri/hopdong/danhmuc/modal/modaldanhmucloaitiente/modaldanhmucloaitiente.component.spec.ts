import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldanhmucloaitienteComponent } from './modaldanhmucloaitiente.component';

describe('ModaldanhmucloaitienteComponent', () => {
  let component: ModaldanhmucloaitienteComponent;
  let fixture: ComponentFixture<ModaldanhmucloaitienteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmucloaitienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmucloaitienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
