import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { signupReducer } from 'src/app/store/signup/signup.reducers';
import { Location } from '@angular/common';
import { SignupSuccessComponent } from '../signup-success/signup-success.component';

import { SignupComponent } from './signup.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        StoreModule.forRoot({ signup: signupReducer }),
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(  [
          {path:'registered', component: SignupSuccessComponent}
        ])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 inputs', () => {
    const formElem = fixture.nativeElement.querySelector('#signupForm');
    const inputElems = formElem.querySelectorAll('input');
    expect(inputElems.length).toEqual(4)
  })

  it('should initialize empty fields', () => {
    const form = component.signupForm;
    expect(form.get('firstName')?.value).toBe('');
    expect(form.get('lastName')?.value).toBe('');
    expect(form.get('email')?.value).toBe('');
    expect(form.get('password')?.value).toBe('');
  })

  it('should accept valid emails', () => {
    const email = component.signupForm.get('email');
    email?.setValue('emman@real.com.eu')
    expect(email?.valid).toBeTruthy();
    email?.setValue('emman@real.com')
    expect(email?.valid).toBeTruthy();
    email?.setValue('emman@real.eu')
    expect(email?.valid).toBeTruthy();
    email?.setValue('em.man@real.com.eu')
    expect(email?.valid).toBeTruthy();
  })

  it('should mark invalid emails', () => {
    const email = component.signupForm.get('email');

    email?.setValue('emman@realcom')  // no .
    expect(email?.valid).toBeFalsy();
    email?.setValue('emmanreal.com') // no @
    expect(email?.valid).toBeFalsy();
    email?.setValue('em@man@real.com') // multiple @
    expect(email?.valid).toBeFalsy();
    email?.setValue('@real.com') // no address before @
    expect(email?.valid).toBeFalsy();
    email?.setValue('emman@real.communi') // domain too long. max 4
    expect(email?.valid).toBeFalsy();
    email?.setValue('emman@real.c'); //domain too short. min 2 chars
    expect(email?.valid).toBeFalsy();
    
    expect(component.signupForm.valid).toBeFalsy();
  })

  it('should prevent first name in password', () => {
    const fname = component.signupForm.get('firstName');
    const lname = component.signupForm.get('lastName');
    const pass = component.signupForm.get('password');
    fname?.setValue('John Paul');
    lname?.setValue('Van Dijk');

    pass?.setValue('xxXXJohnPaulXXxx1');  //spaceless variant
    expect(pass?.hasError('nameUseValidator')).toBeTruthy();

    pass?.setValue('xxXXjOhnPAuLXXxx1');  //different casing
    expect(pass?.hasError('nameUseValidator')).toBeTruthy();

    pass?.setValue('xxXXJOhn PAUlXXxx1');  //space variant. spaces not prohibited in pass
    expect(pass?.hasError('nameUseValidator')).toBeTruthy();

    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should prevent last name in password', () => {
    const fname = component.signupForm.get('firstName');
    const lname = component.signupForm.get('lastName');
    const pass = component.signupForm.get('password');
    fname?.setValue('John Paul');
    lname?.setValue('Van Dijk');

    pass?.setValue('xxXXVanDijkXXxx1');  //spaceless variant
    expect(pass?.hasError('nameUseValidator')).toBeTruthy();

    pass?.setValue('xxXXvanDIJkXXxx1');  //different casing
    expect(pass?.hasError('nameUseValidator')).toBeTruthy();

    pass?.setValue('xxXXVAn dIJkXXxx1');  //space variant. spaces not prohibited in pass
    expect(pass?.hasError('nameUseValidator')).toBeTruthy();

    expect(component.signupForm.valid).toBeFalsy();
  });

  it('password should have at least 1 upper and 1 lowercase', () => {
    const pass = component.signupForm.get('password');
    
    pass?.setValue('PASSword123');    // valid
    expect(pass?.hasError('pattern')).toBeFalsy();
    pass?.setValue('password123');
    expect(pass?.hasError('pattern')).toBeTruthy();
    pass?.setValue('PASSWORD123');
    expect(pass?.hasError('pattern')).toBeTruthy();

    expect(component.signupForm.valid).toBeFalsy();    
  });

  it('password should have at least 8 characters', () => {
    const pass = component.signupForm.get('password');
    pass?.setValue('pass');
    expect(pass?.hasError('minlength')).toBeTruthy();
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should require all fields',fakeAsync(() =>{
    const fname = component.signupForm.get('firstName');
    const lname = component.signupForm.get('lastName');
    const pass = component.signupForm.get('password');
    const email = component.signupForm.get('email');
    const btnElem = fixture.nativeElement.querySelector('#btn-signup');
    fname?.setValue('Emman');
    lname?.setValue('Emman');
    pass?.setValue('ThISiSAvalidPASS@#%');
    email?.setValue('emman@real.com');
    fixture.detectChanges();
    tick();
    
    expect(component.signupForm.valid).toBeTruthy();
    expect(btnElem.disabled).toBeFalsy();
    
    email?.setValue('');  //remove email
    fixture.detectChanges();
    tick();
    
    expect(component.signupForm.valid).toBeFalsy();
    expect(btnElem.disabled).toBeTruthy();

    email?.setValue('emman@real.com');
    pass?.setValue('');   //remove pass
    fixture.detectChanges();
    tick();
    
    expect(component.signupForm.valid).toBeFalsy();
    expect(btnElem.disabled).toBeTruthy();
    
    fname?.setValue('Emman');
    lname?.setValue('');  //remove fname 
    fixture.detectChanges();
    tick();
    
    expect(component.signupForm.valid).toBeFalsy();
    expect(btnElem.disabled).toBeTruthy();

    fname?.setValue('');  //remove fname 
    fixture.detectChanges();
    tick();
    
    expect(component.signupForm.valid).toBeFalsy();
    expect(btnElem.disabled).toBeTruthy();
   
  }))

});
