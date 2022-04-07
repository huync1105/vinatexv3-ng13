import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KehoachkinhdoanhthangComponent } from './kehoachkinhdoanhthang.component';

describe('KehoachkinhdoanhthangComponent', () => {
  let component: KehoachkinhdoanhthangComponent;
  let fixture: ComponentFixture<KehoachkinhdoanhthangComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachkinhdoanhthangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachkinhdoanhthangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
