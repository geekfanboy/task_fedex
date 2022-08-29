import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFailComponent } from './signup-fail.component';

describe('SignupFailComponent', () => {
  let component: SignupFailComponent;
  let fixture: ComponentFixture<SignupFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupFailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
