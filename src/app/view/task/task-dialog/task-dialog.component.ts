import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { id } from 'date-fns/locale';
import { Observable, take, tap } from 'rxjs';
import { AuthState } from 'src/app/auth/reducers';
import { userId } from 'src/app/auth/selectors/auth.selectors';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskEntityService } from 'src/app/services/task/task-entity.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  mode!: 'create' | 'update' | 'view';

  loading$!: Observable<boolean>;

  _id?: string;

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
  hideTime = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private store: Store<AuthState>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private taskEntityService: TaskEntityService,
    private _ngZone: NgZone
  ) {
    this.store
      .pipe(
        select(userId),
        tap((id) => (this._id = id))
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
    };

    if (this.mode === 'view') {
      console.log(this.task);
    } else if (this.mode == 'update') {
      this.form = this.fb.group({ ...formControls });
      this.form.patchValue({ ...data.event });
    } else if (this.mode == 'create') {
      this.form = this.fb.group({
        ...formControls,
        userId: [id, Validators.required],
      });
    }
  }
  ngOnInit(): void {}

  getControl(value: string) {
    return this.form.get(value) as FormControl;
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    const task: any = {
      ...this.task,
      ...this.form.value,
    };

    if (this.mode == 'update') {
      this.taskEntityService
        .update({
          ...task,
          _id: task.id,
          start: new Date(task.start),
          end: new Date(task.end as Date),
          title: task.title,
          color: task.color,
          description: task.description,
        })
        .pipe(tap((val) => this.dialogRef.close(val)))
        .subscribe();
    } else if (this.mode == 'create') {
      this.taskEntityService
        .add({
          title: task.title,
          userId: this._id,
          start: new Date(task.start),
          end: new Date(task.end as Date),
          color: task.color,
          description: task.description,
        })
        .pipe(tap((val) => this.dialogRef.close(val)))
        .subscribe();
    }
  }
}
