import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NhapvattuphuComponent } from './nhapvattuphu.component';

describe('NhapvattuphuComponent', () => {
  let component: NhapvattuphuComponent;
  let fixture: ComponentFixture<NhapvattuphuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapvattuphuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapvattuphuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
