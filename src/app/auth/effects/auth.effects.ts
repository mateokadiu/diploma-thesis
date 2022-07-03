import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { logout } from 'src/app/reducers';
import { AuthActions } from '../actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
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

  signup$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signup),
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
    this._snackBar.open(message, 'OK', { duration: 3000 });
  }
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap((action) => {
          localStorage.removeItem('diploma-thesis.user');
          console.log('hereeee');
          this.router
            .navigateByUrl('/login')
            .then(() => this.openSnackBar('Logged Out Successfully!'));
        })
      ),
    { dispatch: false }
  );
}
