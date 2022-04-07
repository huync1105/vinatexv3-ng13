import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldmkhoComponent } from './modaldmkho.component';

describe('ModaldmkhoComponent', () => {
  let component: ModaldmkhoComponent;
  let fixture: ComponentFixture<ModaldmkhoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldmkhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldmkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
