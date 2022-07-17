import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { EmployeeTaskEntityService } from 'src/app/services/employee/employee-task-entity.service';
import { defaultDialogConfig } from 'src/app/shared/default-dialog-config';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-calendar',
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.scss'],
})
export class TaskCalendarComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private tasksEntityService: EmployeeTaskEntityService
  ) {}

  onTaskChanges() {
    this.tasksEntityService.entities$
      .pipe(
        takeUntil(this.destroy$),
        tap((val) => {
          this.events = [];
          val.forEach(
            ({
              start,
              end,
              title,
              color,
              _id,
              description,
              to,
              from,
              status,
            }) => {
              this.events.push({
                start: new Date(start),
                title,
                end: new Date(end as Date),
                color: {
                  ...color,
                },
                description: description,
                id: _id,
                to,
                from,
                status,
              });
            }
          );
        }),
        distinctUntilChanged()
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.onTaskChanges();
  }

  events: CalendarEvent<Task>[] = [];

  emitChildEvent({ event, action }: any) {
    const dialogConfig = defaultDialogConfig();
    if (action === 'Clicked') {
      dialogConfig.data = {
        dialogTitle: 'Task Information',
        event,
        mode: 'view',
      };
    }
    this.dialog.open(TaskDialogComponent, {
      ...dialogConfig,
      disableClose: false,
    });
  }
}
