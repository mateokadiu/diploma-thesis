import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
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

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: `<i class="fas fa-fw fa-trash-alt"></i>`,
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.tasksEntityService.delete(event.id as string);
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  refresh = new Subject<void>();

  constructor(
    private tasksEntityService: TaskEntityService,
    private dialog: MatDialog
  ) {}

  onTaskChanges() {
    this.events = [];
    this.tasksEntityService.entities$
      .pipe(
        tap((val) =>
          val.forEach(({ start, end, title, color, _id }) => {
            this.events.push({
              start: new Date(start),
              title,
              actions: this.actions,
              end: new Date(end as Date),
              color: {
                ...color,
              },
              id: _id,
            });
          })
        )
      )
      .subscribe()
      .unsubscribe();
  }

  ngOnInit(): void {
    this.onTaskChanges();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
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
        .pipe(
          tap(() => this.onTaskChanges()),
          takeUntil(this.destroy$)
        )
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
      .pipe(
        tap(() => this.onTaskChanges()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.tasksEntityService.delete(eventToDelete.id as string);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
