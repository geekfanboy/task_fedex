import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import { FormValidators } from './../../common/form-validators';
import { Registration } from './../../models/registration.model';
import * as SignUpActions from './../../store/signup/signup.actions'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private store: Store) { }

  signupForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-zA-Z]{2,4}$")]],  //regex pattern checks for email validity
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(.*)$")]],   //regex pattern checks for presence of at elast 1 upper and 1 lowercase char
  }, { validator: [FormValidators.NameInPassword("password", "firstName", "lastName")] });


  ngOnInit(): void {
  }

  onSubmit() {
    const user: Registration = {
      email: this.signupForm.get('email')?.value,
      firstName: this.signupForm.get('firstName')?.value,
      lastName: this.signupForm.get('lastName')?.value,
      //password not posted as per Request Body Example
    }

    this.store.dispatch(SignUpActions.registerUser({ user }));
  }


}
