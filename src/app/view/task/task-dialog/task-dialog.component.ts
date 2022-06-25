import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { id } from 'date-fns/locale';
import { Observable, tap } from 'rxjs';
import { AuthState } from 'src/app/auth/reducers';
import { userId } from 'src/app/auth/selectors/auth.selectors';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskEntityService } from 'src/app/services/task/task-entity.service';

const colors: any = {
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

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDialogComponent implements OnInit {
  form!: FormGroup;

  dialogTitle!: string;

  task!: Task;

  mode!: 'create' | 'update';

  loading$!: Observable<boolean>;

  _id?: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private store: Store<AuthState>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private taskEntityService: TaskEntityService
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
        })
        .pipe(tap((val) => this.dialogRef.close(val)))
        .subscribe();
    } else if (this.mode == 'create') {
      console.log(task);
      this.taskEntityService
        .add({
          title: task.title,
          userId: this._id,
          end: new Date(task.end as Date),
          start: new Date(task.start),
          color: colors.blue,
        })
        .pipe(tap((val) => this.dialogRef.close(val)))
        .subscribe();
      // this.taskEntityService.add({
      //   userId: '62addb0c5bf6553069040b09',
      //   start: new Date('2022-06-23T09:04:45.904Z'),
      //   end: new Date('2022-07-23T09:04:45.904Z'),
      //   title: 'Title 1',
      //   color: {
      //     primary: '#e23142',
      //     secondary: '#412415',
      //   },
      // });
    }
  }
}
