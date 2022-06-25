import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  catchError,
  map,
  noop,
  of,
  Subject,
  take,
  takeLast,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { AppState } from 'src/app/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { login } from '../actions/auth-actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private title: Title,
    private store: Store<AppState>,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    title.setTitle('Login');

    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
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
    });
  }

  onSubmit() {
    this.authService
      .login(this.loginForm.value)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        }),
        tap((user) => this.store.dispatch(login({ user }))),
        takeUntil(this.destroy$)
      )
      .subscribe({
        error: ({ error }) => this._snackBar.open(error.message, 'OK'),
        complete: () => this._snackBar.open('Logged in successfully!', 'OK'),
      });
  }

  getControl(value: string) {
    return this.loginForm.get(value) as FormControl;
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
