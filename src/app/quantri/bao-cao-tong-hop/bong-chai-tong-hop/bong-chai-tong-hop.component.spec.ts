import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { BongChaiTongHopComponent } from './bong-chai-tong-hop.component';

describe('BongChaiTongHopComponent', () => {
  let component: BongChaiTongHopComponent;
  let fixture: ComponentFixture<BongChaiTongHopComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BongChaiTongHopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BongChaiTongHopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
