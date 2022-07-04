import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEventAction, CalendarEvent } from 'angular-calendar';
import { Subject, takeUntil, tap, distinctUntilChanged } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { defaultDialogConfig } from 'src/app/shared/default-dialog-config';
import { ManagerTaskEntityService } from '../../services/manager/manager-task-entity.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss'],
})
export class TaskManagementComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent<Task> }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: `<i class="fas fa-fw fa-trash-alt"></i>`,
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent<Task> }): void => {
        this.tasksEntityService.delete(event.id as string);
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  events: CalendarEvent<Task>[] = [];

  constructor(
    private tasksEntityService: ManagerTaskEntityService,
    private dialog: MatDialog
  ) {}

  onTaskChanges() {
    this.tasksEntityService.entities$
      .pipe(
        takeUntil(this.destroy$),
        tap((val) => {
          this.events = [];
          val.forEach(
            ({ start, end, title, color, _id, description, to, from }) => {
              this.events.push({
                start: new Date(start),
                title,
                actions: this.actions,
                end: new Date(end as Date),
                color: {
                  ...color,
                },
                description: description,
                id: _id,
                to,
                from,
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

  handleEvent(action: string, event: CalendarEvent): void {
    const dialogConfig = defaultDialogConfig();

    if (action === 'Edited') {
      dialogConfig.data = {
        dialogTitle: 'Edit Task',
        event,
        mode: 'update',
      };

      this.dialog.open(TaskDialogComponent, {
        ...dialogConfig,
        disableClose: false,
      });
    }
  }

  addEvent(): void {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create',
    };
    this.dialog.open(TaskDialogComponent, {
      ...dialogConfig,
      disableClose: false,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
