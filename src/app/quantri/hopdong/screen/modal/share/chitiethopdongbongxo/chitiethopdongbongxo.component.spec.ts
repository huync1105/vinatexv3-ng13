import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ChitiethopdongbongxoComponent } from './chitiethopdongbongxo.component';

describe('ChitiethopdongbongxoComponent', () => {
  let component: ChitiethopdongbongxoComponent;
  let fixture: ComponentFixture<ChitiethopdongbongxoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitiethopdongbongxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitiethopdongbongxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
