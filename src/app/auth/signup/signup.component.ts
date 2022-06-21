import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { catchError, Subject, takeUntil, tap, throwError } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { MatchPassword } from 'src/app/validators/match-password.validator';
import { signup } from '../actions/auth-actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  hidePassword = true;
  hideConfirm = true;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private title: Title,
    private matchPassword: MatchPassword,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    title.setTitle('Signup');
    this.signupForm = fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.pattern(
              /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: [this.matchPassword.validate] }
    );
  }

  getControl(value: string) {
    return this.signupForm.get(value) as FormControl;
  }

  onSubmit() {
    this.authService
      .signup(this.signupForm.value)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        }),
        tap((user) => this.store.dispatch(signup({ user }))),
        takeUntil(this.destroy$)
      )
      .subscribe({
        error: ({ error }) => this._snackBar.open(error.message, 'OK'),
        complete: () => this._snackBar.open('Signed up successfully!', 'OK'),
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
