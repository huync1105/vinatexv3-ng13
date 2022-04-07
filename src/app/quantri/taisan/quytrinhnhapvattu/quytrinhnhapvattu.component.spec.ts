import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { QuytrinhnhapvattuComponent } from './quytrinhnhapvattu.component';

describe('QuytrinhnhapvattuComponent', () => {
  let component: QuytrinhnhapvattuComponent;
  let fixture: ComponentFixture<QuytrinhnhapvattuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuytrinhnhapvattuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuytrinhnhapvattuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
