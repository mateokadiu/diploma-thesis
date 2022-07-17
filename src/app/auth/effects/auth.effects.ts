import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { AppState } from 'src/app/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { AuthActions } from '../actions';
import { loggedUser, logout, logUserData } from '../actions/auth-actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  onRefresh$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.triggeredOnRefresh),
        tap((action) => {
          if (action?.user && action?.tokens)
            this.authService
              .refreshSession(
                action?.user as unknown as User,
                action?.tokens?.refreshToken as unknown as string
              )
              .pipe(
                tap((token) =>
                  this.store.dispatch(
                    loggedUser({
                      user: action.user,
                      tokens: {
                        accessToken: token.accessToken,
                        refreshToken: action.tokens
                          ?.refreshToken as unknown as string,
                      },
                    })
                  )
                )
              )
              .subscribe();
        })
      ),
    { dispatch: false }
  );

  userLoggedAttempt$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loggedUser),
        tap((action) => {
          localStorage.setItem(
            'diploma-thesis.tokens',
            JSON.stringify(action?.tokens)
          );
          localStorage.setItem(
            'diploma-thesis.user',
            JSON.stringify(action?.user)
          );
        })
      ),
    { dispatch: false }
  );

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap((action) => {
          this.authService
            .getUser()
            .pipe(
              tap((user: any) => {
                localStorage.setItem(
                  'diploma-thesis.tokens',
                  JSON.stringify(action?.tokens)
                );
                this.store.dispatch(logUserData({ user }));
              })
            )
            .subscribe();
        })
      ),
    {
      dispatch: false,
    }
  );

  logUserData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logUserData),
        tap((action) => {
          localStorage.setItem(
            'diploma-thesis.user',
            JSON.stringify(action?.user)
          );
          this.router.navigateByUrl('/view/home').then();
        })
      ),
    {
      dispatch: false,
    }
  );

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', { duration: 2000 });
  }
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap((action) => {
          localStorage.removeItem('diploma-thesis.user');
          localStorage.removeItem('diploma-thesis.tokens');
          this.router
            .navigateByUrl('/login')
            .then(() => this.openSnackBar('Logged Out Successfully!'));
        })
      ),
    { dispatch: false }
  );
}
