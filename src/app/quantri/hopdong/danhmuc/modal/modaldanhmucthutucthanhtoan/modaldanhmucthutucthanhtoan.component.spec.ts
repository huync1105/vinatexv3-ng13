import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ModaldanhmucthutucthanhtoanComponent } from './modaldanhmucthutucthanhtoan.component';

describe('ModaldanhmucthutucthanhtoanComponent', () => {
  let component: ModaldanhmucthutucthanhtoanComponent;
  let fixture: ComponentFixture<ModaldanhmucthutucthanhtoanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmucthutucthanhtoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmucthutucthanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
