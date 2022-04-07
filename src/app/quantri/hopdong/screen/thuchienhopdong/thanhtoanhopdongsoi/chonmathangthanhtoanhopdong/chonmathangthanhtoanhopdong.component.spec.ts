import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChonmathangthanhtoanhopdongComponent } from './chonmathangthanhtoanhopdong.component';

describe('ChonmathangthanhtoanhopdongComponent', () => {
  let component: ChonmathangthanhtoanhopdongComponent;
  let fixture: ComponentFixture<ChonmathangthanhtoanhopdongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonmathangthanhtoanhopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonmathangthanhtoanhopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
