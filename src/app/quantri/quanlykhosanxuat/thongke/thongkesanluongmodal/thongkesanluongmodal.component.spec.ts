import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ThongkesanluongmodalComponent } from './thongkesanluongmodal.component';

describe('ThongkesanluongmodalComponent', () => {
  let component: ThongkesanluongmodalComponent;
  let fixture: ComponentFixture<ThongkesanluongmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkesanluongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkesanluongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
