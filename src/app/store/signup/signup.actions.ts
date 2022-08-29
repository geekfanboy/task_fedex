import { Injectable } from "@angular/core";
import { createAction, props } from "@ngrx/store";
import { Registration } from "../../models/registration.model";

export enum SignUpActionTypes {
    SIGNUP = "[Sign Up] Register User",
    SIGNUP_SUCCESS = "[Sign Up] Register Successful",
    SIGNUP_ERR = "[Sign Up] Register Failed",
}

export const registerUser = createAction(
    SignUpActionTypes.SIGNUP,
    props<{ user:Registration }>()
);

export const registerSuccess = createAction(
    SignUpActionTypes.SIGNUP_SUCCESS,
    props<{ response:any}>()
);


export const registerFail = createAction(
    SignUpActionTypes.SIGNUP_ERR,
    props<{ error:string }>()
)