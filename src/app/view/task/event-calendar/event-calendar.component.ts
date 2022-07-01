import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import {
  catchError,
  distinctUntilChanged,
  filter,
  last,
  map,
  noop,
  shareReplay,
  Subject,
  takeLast,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskEntityService } from 'src/app/services/task/task-entity.service';

import {
  startOfDay,
  endOfDay,
  isSameDay,
  isSameMonth,
  subDays,
  addDays,
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { MatDialog } from '@angular/material/dialog';
import { defaultDialogConfig } from 'src/app/shared/default-dialog-config';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { select } from '@ngrx/store';

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
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class EventCalendarComponent implements OnInit {
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
    private tasksEntityService: TaskEntityService,
    private dialog: MatDialog
  ) {}

  onTaskChanges() {
    this.tasksEntityService.entities$
      .pipe(
        takeUntil(this.destroy$),
        tap((val) => {
          this.events = [];
          val.forEach(({ start, end, title, color, _id, description }) => {
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
            });
          });
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

      this.dialog
        .open(TaskDialogComponent, {
          ...dialogConfig,
          disableClose: false,
        })
        .afterClosed()
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
  }

  addEvent(): void {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create',
    };
    this.dialog
      .open(TaskDialogComponent, {
        ...dialogConfig,
        disableClose: false,
      })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
