import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChitietdieukhoanthanhtoanComponent } from './chitietdieukhoanthanhtoan.component';

describe('ChitietdieukhoanthanhtoanComponent', () => {
  let component: ChitietdieukhoanthanhtoanComponent;
  let fixture: ComponentFixture<ChitietdieukhoanthanhtoanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietdieukhoanthanhtoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietdieukhoanthanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
