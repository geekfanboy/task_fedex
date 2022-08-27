import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupSuccessComponent } from './components/signup-success/signup-success.component';
import { SignupFailComponent } from './components/signup-fail/signup-fail.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'registered', component: SignupSuccessComponent},
  { path: 'registerfail', component: SignupFailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
