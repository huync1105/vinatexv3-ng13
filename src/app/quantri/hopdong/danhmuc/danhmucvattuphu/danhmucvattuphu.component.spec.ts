import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhmucvattuphuComponent } from './danhmucvattuphu.component';

describe('DanhmucvattuphuComponent', () => {
  let component: DanhmucvattuphuComponent;
  let fixture: ComponentFixture<DanhmucvattuphuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucvattuphuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucvattuphuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
