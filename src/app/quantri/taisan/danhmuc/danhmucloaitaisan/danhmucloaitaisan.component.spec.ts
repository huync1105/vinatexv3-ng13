import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { DanhmucloaitaisanComponent } from './danhmucloaitaisan.component';

describe('DanhmucloaitaisanComponent', () => {
  let component: DanhmucloaitaisanComponent;
  let fixture: ComponentFixture<DanhmucloaitaisanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucloaitaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucloaitaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
