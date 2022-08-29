import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, mergeMap, tap, exhaustMap, catchError, switchMap } from 'rxjs';
import { DemoApiService } from '../../services/demo-api.service';
import * as SignUpActions from './signup.actions';

@Injectable()
export class SignUpEffects {


    registerUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SignUpActions.registerUser),
            exhaustMap(action =>
                this.demoApi.registerUser(action)
                    .pipe(
                        map((response) => SignUpActions.registerSuccess({ response })),
                        catchError((error) => of(SignUpActions.registerFail({ error })))
                    )
            )
        )
    )

    registerSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SignUpActions.registerSuccess),
            tap((data) => { this.router.navigate(['/registered']); })
        ), { dispatch: false }
    )

    registerFail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SignUpActions.registerFail),
            tap((data) => { this.router.navigate(['/registerfail']); })
        ), { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private demoApi: DemoApiService,
        private router: Router
    ) { }

}