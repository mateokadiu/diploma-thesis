import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { id } from 'date-fns/locale';
import {
  take,
  Observable,
  tap,
  noop,
  takeUntil,
  catchError,
  throwError,
} from 'rxjs';
import { AuthState } from 'src/app/auth/reducers';
import {
  getLoggedUserData,
  userId,
} from 'src/app/auth/selectors/auth.selectors';
import { Task } from 'src/app/interfaces/task.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ManagerTaskEntityService } from 'src/app/services/manager/manager-task-entity.service';
import { UserEntityService } from 'src/app/services/user/user-entity.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };
  form!: FormGroup;

  dialogTitle!: string;

  task!: Task;

  mode!: 'create' | 'update' | 'view' | 'delete';

  loading$!: Observable<boolean>;

  user!: User;

  users!: User[];

  disabled = false;
  showSpinners = true;
  showSeconds = false;
  touchUi = false;
  enableMeridian = false;
  minDate!: Date;
  maxDate!: Date;
  stepHour = 1;
  stepMinute = 1;
  stepSecond = 1;
  color: ThemePalette = 'primary';
  disableMinute = false;
  selected!: any;
  hideTime = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private store: Store<AuthState>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private _snackBar: MatSnackBar,
    private taskEntityService: ManagerTaskEntityService,
    private userEntityService: UserEntityService,
    private _ngZone: NgZone
  ) {
    this.store
      .pipe(
        select(getLoggedUserData),
        tap((user) => (this.user = user))
      )
      .subscribe();

    this.dialogTitle = data.dialogTitle;
    this.task = data.event;
    this.mode = data.mode;

    const formControls = {
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      color: this.fb.group({
        primary: ['', Validators.required],
        secondary: ['', Validators.required],
      }),
      description: ['', Validators.required],
      from: [this.user?.email, Validators.required],
      to: ['', Validators.required],
    };

    if (this.mode == 'update') {
      this.form = this.fb.group({ ...formControls });
      this.form.patchValue({ ...data.event });
    } else if (this.mode == 'create') {
      this.form = this.fb.group({
        ...formControls,
        userId: [id, Validators.required],
      });
    }
  }
  ngOnInit(): void {
    this.userEntityService.entities$
      .pipe(tap((userList) => (this.users = userList)))
      .subscribe(noop)
      .unsubscribe();
  }

  getControl(value: string) {
    return this.form.get(value) as FormControl;
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    const task: any = {
      ...this.task,
      ...this.form?.value,
    };

    if (this.mode == 'update') {
      this.taskEntityService
        .update({
          _id: task.id,
          start: new Date(task.start),
          end: new Date(task.end as Date),
          title: task.title,
          color: task.color,
          description: task.description,
          to: task.to,
          from: task.from,
        })
        .pipe(tap(() => this.dialogRef.close()))
        .subscribe(noop);
    } else if (this.mode == 'create') {
      this.taskEntityService
        .add({
          title: task.title,
          userId: this.user._id,
          start: new Date(task.start),
          end: new Date(task.end as Date),
          color: task.color,
          description: task.description,
          to: task.to,
          from: task.from,
        })
        .pipe(tap((val) => this.dialogRef.close(val)))
        .subscribe(noop);
    } else if (this.mode == 'delete') {
      this.taskEntityService
        .delete(task.id as string)
        .pipe(catchError((err) => throwError(() => err)))
        .subscribe({
          error: (err) =>
            this._snackBar.open(err.error.message, 'OK', { duration: 2000 }),
          complete: () => {
            this._snackBar.open('Task deleted successfully!', 'OK', {
              duration: 2000,
            });
            this.dialogRef.close();
          },
        });
    }
  }
}
