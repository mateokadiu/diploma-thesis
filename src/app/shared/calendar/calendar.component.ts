import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CalendarView,
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { isSameMonth, isSameDay } from 'date-fns';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  selectedView = 1;

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  @Output()
  emitClickEvent = new EventEmitter();

  @Input()
  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  refresh = new Subject<void>();

  constructor() {}

  ngOnInit(): void {}

  handleEvent(action: string, event: CalendarEvent): void {
    this.emitClickEvent.emit({ action, event });
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
