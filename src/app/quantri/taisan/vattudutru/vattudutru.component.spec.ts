import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { VattudutruComponent } from './vattudutru.component';

describe('VattudutruComponent', () => {
  let component: VattudutruComponent;
  let fixture: ComponentFixture<VattudutruComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VattudutruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VattudutruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
