import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { VattugiatricaoComponent } from './vattugiatricao.component';

describe('VattugiatricaoComponent', () => {
  let component: VattugiatricaoComponent;
  let fixture: ComponentFixture<VattugiatricaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VattugiatricaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VattugiatricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
