import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserEntityService } from 'src/app/services/user/user-entity.service';
import { MatchPassword } from 'src/app/validators/match-password.validator';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss'],
})
export class UpdateInfoComponent implements OnInit {
  dialogTitle!: string;

  mode!: 'update' | 'password';
  user!: User;

  hidePassword = true;
  hideConfirm = true;

  destroy$: Subject<boolean> = new Subject<boolean>();

  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdateInfoComponent>,
    private matchPassword: MatchPassword,
    private _snackBar: MatSnackBar,
    private userEntityService: UserEntityService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.dialogTitle = data.dialogTitle;
    this.user = data.user;
    this.mode = data.mode;
  }

  ngOnInit(): void {
    if (this.mode === 'update') {
      this.form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        role: ['', Validators.required],
        gender: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
      });
      this.form.patchValue({ ...this.user });
    } else if (this.mode === 'password') {
      this.form = this.fb.group(
        {
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

  getControl(value: string) {
    return this.form.get(value) as FormControl;
  }

  onInfoUpdate() {
    if (this.mode === 'update') {
      this.userEntityService
        .update({ _id: this.user._id, ...this.form.value })
        .pipe(
          takeUntil(this.destroy$),
          catchError((err) => throwError(() => err))
        )
        .subscribe({
          error: (err) =>
            this._snackBar.open(err.error.message, 'OK', {
              duration: 2000,
            }),
          complete: () => {
            this._snackBar.open(`User info updated successfully!`, 'OK', {
              duration: 2000,
            });
            this.dialogRef.close();
          },
        });
    } else if (this.mode === 'password') {
      this.userEntityService
        .update({ _id: this.user._id, ...this.form.value })
        .pipe(
          takeUntil(this.destroy$),
          catchError((err) => throwError(() => err))
        )
        .subscribe({
          error: (err) =>
            this._snackBar.open(err.error.message, 'OK', {
              duration: 2000,
            }),
          complete: () => {
            this._snackBar.open(`User password updated successfully!`, 'OK', {
              duration: 2000,
            });
            this.dialogRef.close();
          },
        });
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
