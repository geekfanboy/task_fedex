import { Component, OnInit } from '@angular/core';
import * as fromSign from './../../store/signup/signup.reducers';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup-success',
  templateUrl: './signup-success.component.html',
  styleUrls: ['./signup-success.component.scss']
})
export class SignupSuccessComponent implements OnInit {

  email = '';
  fname = '';

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.store.select(fromSign.selectUser).subscribe(user => {
      this.email = user.email;
      this.fname = user.firstName;
      if (!this.email) {
        this.router.navigate(['/']);
      }
    });
  }

}
