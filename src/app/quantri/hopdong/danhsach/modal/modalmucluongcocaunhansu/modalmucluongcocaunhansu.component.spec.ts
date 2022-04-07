import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModalmucluongcocaunhansuComponent } from './modalmucluongcocaunhansu.component';

describe('ModalmucluongcocaunhansuComponent', () => {
  let component: ModalmucluongcocaunhansuComponent;
  let fixture: ComponentFixture<ModalmucluongcocaunhansuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalmucluongcocaunhansuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalmucluongcocaunhansuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
