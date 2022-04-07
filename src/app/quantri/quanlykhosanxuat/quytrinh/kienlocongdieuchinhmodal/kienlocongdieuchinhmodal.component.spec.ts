import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { KienlocongdieuchinhmodalComponent } from './kienlocongdieuchinhmodal.component';

describe('KienlocongdieuchinhmodalComponent', () => {
  let component: KienlocongdieuchinhmodalComponent;
  let fixture: ComponentFixture<KienlocongdieuchinhmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KienlocongdieuchinhmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KienlocongdieuchinhmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
