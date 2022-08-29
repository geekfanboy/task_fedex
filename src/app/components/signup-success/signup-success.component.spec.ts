import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { signupReducer } from 'src/app/store/signup/signup.reducers';

import { SignupSuccessComponent } from './signup-success.component';

describe('SignupSuccessComponent', () => {
  let component: SignupSuccessComponent;
  let fixture: ComponentFixture<SignupSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupSuccessComponent ],
      imports: [StoreModule.forRoot({signup: signupReducer}),]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
