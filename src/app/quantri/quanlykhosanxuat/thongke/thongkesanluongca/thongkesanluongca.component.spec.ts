import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ThongkesanluongcaComponent } from './thongkesanluongca.component';

describe('ThongkesanluongcaComponent', () => {
  let component: ThongkesanluongcaComponent;
  let fixture: ComponentFixture<ThongkesanluongcaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkesanluongcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkesanluongcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
