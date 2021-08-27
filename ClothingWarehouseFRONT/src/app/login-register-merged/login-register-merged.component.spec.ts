import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterMergedComponent } from './login-register-merged.component';

describe('LoginRegisterMergedComponent', () => {
  let component: LoginRegisterMergedComponent;
  let fixture: ComponentFixture<LoginRegisterMergedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegisterMergedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterMergedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
