import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldmloaidienComponent } from './modaldmloaidien.component';

describe('ModaldmloaidienComponent', () => {
  let component: ModaldmloaidienComponent;
  let fixture: ComponentFixture<ModaldmloaidienComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldmloaidienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldmloaidienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
