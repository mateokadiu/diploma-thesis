import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { noop, Observable, tap } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { EmployeeTaskEntityService } from 'src/app/services/employee/employee-task-entity.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  dialogTitle!: string;
  mode!: 'view';
  task!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private taskEntityService: EmployeeTaskEntityService
  ) {
    this.dialogTitle = data.dialogTitle;
    this.task = data.event;
    this.mode = data.mode;
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.mode === 'view') {
      this.taskEntityService
        .update({ _id: this.task.id, status: 'Completed' })
        .pipe(tap(() => this.dialogRef.close()))
        .subscribe(noop);
    }
  }

  ngOnInit(): void {}
}
