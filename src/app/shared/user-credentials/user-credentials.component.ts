import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { catchError, noop, Subject, takeUntil, tap, throwError } from 'rxjs';
import { updateAccount } from 'src/app/auth/actions/auth-actions';
import { AuthState } from 'src/app/auth/reducers';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MatchPassword } from 'src/app/validators/match-password.validator';

@Component({
  selector: 'app-user-credentials',
  templateUrl: './user-credentials.component.html',
  styleUrls: ['./user-credentials.component.scss'],
})
export class UserCredentialsComponent implements OnInit {
  user!: User;

  dialogTitle!: string;

  form!: FormGroup;

  mode!: 'update-credentials' | 'update-password';

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserCredentialsComponent>,
    private store: Store<AuthState>,
    private authService: AuthService,
    private matchPassword: MatchPassword,
    @Inject(MAT_DIALOG_DATA) data: any,
    private _snackBar: MatSnackBar
  ) {
    this.dialogTitle = data.dialogTitle;
    this.user = data.user;
    this.mode = data.mode;

    if (this.mode === 'update-credentials') {
      this.form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        gender: ['', Validators.required],
        role: ['', Validators.required],
      });

      this.form.patchValue({ ...this.user });
    } else if (this.mode === 'update-password') {
      this.form = this.fb.group(
        {
          currentPassword: [
            '',
            [
              Validators.required,
              Validators.minLength(10),
              Validators.pattern(
                /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/
              ),
            ],
          ],
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
          confirmPassword: ['', Validators.required],
        },
        { validators: [this.matchPassword.validate] }
      );
    }
  }
  hideCurrentPassword = true;
  hidePassword = true;
  hideConfirm = true;

  getControl(value: string) {
    return this.form.get(value) as FormControl;
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.mode === 'update-credentials') {
      this.authService
        .editUser({ _id: this.user._id, ...this.form.value })
        .pipe(
          takeUntil(this.destroy$),
          catchError((err) => throwError(() => err)),
          tap((user) => this.store.dispatch(updateAccount({ user })))
        )
        .subscribe({
          error: ({ error }) =>
            this._snackBar.open(error.message, 'OK', { duration: 2000 }),
          complete: () => {
            this._snackBar.open('User updated successfully!', 'OK', {
              duration: 2000,
            });
            this.dialogRef.close();
          },
        });
    } else if (this.mode === 'update-password') {
      this.authService
        .changePassword({
          _id: this.user._id,
          password: this.form.value.currentPassword,
          newPassword: this.form.value.password,
        })
        .pipe(
          takeUntil(this.destroy$),
          catchError((err) => throwError(() => err)),
          tap((user) => this.store.dispatch(updateAccount({ user })))
        )
        .subscribe({
          error: ({ error }) =>
            this._snackBar.open(error.message, 'OK', { duration: 2000 }),
          complete: () => {
            this._snackBar.open('User password updated successfully!', 'OK', {
              duration: 2000,
            });
            this.dialogRef.close();
          },
        });
    }

    // this.authService
    //   .changePassword({
    //     _id: '62c4535ce7fcd8b34b2bd89a',
    //     password: 'Mateo12345@',
    //     newPassword: 'Mateo1234@',
    //   })
    //   .pipe(tap(console.log))
    //   .subscribe();
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
