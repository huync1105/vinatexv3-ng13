import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { GhepThoTongHopComponent } from './ghep-tho-tong-hop.component';

describe('GhepThoTongHopComponent', () => {
  let component: GhepThoTongHopComponent;
  let fixture: ComponentFixture<GhepThoTongHopComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GhepThoTongHopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhepThoTongHopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
