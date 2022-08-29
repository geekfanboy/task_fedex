import { Registration } from '../../models/registration.model';
import { Action, createFeatureSelector, createReducer, createSelector, INITIAL_STATE, on } from '@ngrx/store';
import * as SignUpActions from './signup.actions';
import { state } from '@angular/animations';
import { tap } from 'rxjs';

export interface State {
    token: string;
    success: boolean;
    user: Registration;
    loginErr: string;
}

export const initialState: State = {
    token: '',
    loginErr: '',
    success: false,
    user: {firstName: '', lastName: '', email: ''}
}

const _signupReducer = createReducer(
    initialState,
    on(SignUpActions.registerUser, (state, {user}) => {
        return {
            ...state,
            user: user
        }
    }),
    on(SignUpActions.registerSuccess, (state, { response }) => {
        return {
            ...state,
            token: response._id
        }
    }),
    on(SignUpActions.registerFail, (state, { error }) => {
        return {
            ...state,
            token: '',
            loginErr: error
        }
    })
    
);

export function signupReducer(state: State | undefined, action: Action){
    return _signupReducer(state, action);
};

export const selectUserState = createFeatureSelector<State>('signup');
export const selectUser = createSelector(selectUserState, res => res.user);
export const selectToken = createSelector(selectUserState, res => res.token);