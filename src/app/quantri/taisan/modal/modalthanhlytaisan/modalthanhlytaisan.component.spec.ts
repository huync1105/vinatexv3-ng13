import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalthanhlytaisanComponent } from './modalthanhlytaisan.component';

describe('ModalthanhlytaisanComponent', () => {
  let component: ModalthanhlytaisanComponent;
  let fixture: ComponentFixture<ModalthanhlytaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalthanhlytaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalthanhlytaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
