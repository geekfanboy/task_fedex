import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SignupComponent } from './components/signup/signup.component';
import { SignupSuccessComponent } from './components/signup-success/signup-success.component';
import { TrimInputDirective } from './directives/trim-input.directive';
import { signupReducer } from './store/signup/signup.reducers';
import { SignUpEffects } from './store/signup/signup.effects';
import { SignupFailComponent } from './components/signup-fail/signup-fail.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SignupSuccessComponent,
    TrimInputDirective,
    SignupFailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,    
    StoreModule.forRoot({signup: signupReducer}),
    EffectsModule.forRoot([SignUpEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
