import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { UserEntityService } from 'src/app/services/user/user-entity.service';
import { MatchPassword } from 'src/app/validators/match-password.validator';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  @ViewChild('form') from!: FormGroupDirective;

  signupForm: FormGroup;

  hidePassword = true;
  hideConfirm = true;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private title: Title,
    private matchPassword: MatchPassword,
    private userEntityService: UserEntityService,
    private _snackBar: MatSnackBar
  ) {
    title.setTitle('Admin - Create User');
    this.signupForm = fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        gender: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        role: ['', [Validators.required]],
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
    this.userEntityService
      .add(this.signupForm.value)
      .pipe(
        catchError((err) => throwError(() => err)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        error: ({ error }) => this._snackBar.open(error.error.message, 'OK'),
        complete: () => {
          this.signupForm.reset();
          this.from.resetForm();
          this._snackBar.open('User created successfully!', 'OK');
        },
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
