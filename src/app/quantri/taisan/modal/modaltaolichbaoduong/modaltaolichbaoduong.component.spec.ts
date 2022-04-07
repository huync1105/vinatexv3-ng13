import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaltaolichbaoduongComponent } from './modaltaolichbaoduong.component';

describe('ModaltaolichbaoduongComponent', () => {
  let component: ModaltaolichbaoduongComponent;
  let fixture: ComponentFixture<ModaltaolichbaoduongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaltaolichbaoduongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaltaolichbaoduongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
