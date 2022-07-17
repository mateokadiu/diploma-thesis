import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  BehaviorSubject,
  interval,
  noop,
  Observable,
  of,
  ReplaySubject,
  Subject,
  Subscription,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import {
  loggedUser,
  login,
  triggeredOnRefresh,
} from './auth/actions/auth-actions';
import {
  getLoggedUserData,
  isLoggedIn,
  isLoggedOut,
} from './auth/selectors/auth.selectors';
import { Task } from './interfaces/task.interface';
import { User } from './interfaces/user.interface';
import { AppState } from './reducers';
import { EmployeeTaskEntityService } from './services/employee/employee-task-entity.service';
import { ManagerTaskEntityService } from './services/manager/manager-task-entity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'task-connect';

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<AppState>,
    private employeeTasksEntityService: EmployeeTaskEntityService,
    private managerTaskEntityService: ManagerTaskEntityService
  ) {}

  interval!: Subscription;

  ngOnInit() {
    const user = localStorage.getItem('diploma-thesis.user');
    const tokens = localStorage.getItem('diploma-thesis.tokens');
    if (user && tokens) {
      this.store.dispatch(
        triggeredOnRefresh({
          tokens: JSON.parse(tokens),
          user: JSON.parse(user),
        })
      );

      const u: User = JSON.parse(user as string);
      const num =
        new Date(
          ((u?.exp as number) - (u?.iat as number)) * 1000
        ).getMinutes() *
          60000 -
        5000;
      console.log(num);

      this.interval = interval(num)
        .pipe(
          tap(() => {
            this.store.dispatch(
              triggeredOnRefresh({
                user: JSON.parse(user as string),
                tokens: JSON.parse(tokens as string),
              })
            );
          })
        )
        .subscribe(noop);

      if (u?.role == 'Employee') {
        timer(0, 10000)
          .pipe(
            tap(() => {
              this.employeeTasksEntityService.entities$
                .pipe(
                  tap((tasks) => this.failEmployeeTasks(tasks)),
                  takeUntil(this.destroy$)
                )
                .subscribe()
                .unsubscribe();
            })
          )
          .subscribe();
      } else if (u?.role == 'Manager') {
        timer(0, 10000)
          .pipe(
            tap(() => {
              this.managerTaskEntityService.entities$
                .pipe(
                  tap((tasks) => this.failManagerTasks(tasks)),
                  takeUntil(this.destroy$)
                )
                .subscribe()
                .unsubscribe();
            })
          )
          .subscribe();
      }
    }

    this.isLoggedIn$
      .pipe(
        tap((isLogged) => {
          if (!isLogged) {
            this.interval?.unsubscribe();
          }
        })
      )
      .subscribe(noop);
  }

  failEmployeeTasks(tasks: Task[]): void {
    tasks.forEach(({ end, _id, status }) => {
      if (
        new Date(end).getTime() < new Date().getTime() &&
        status === 'Assigned'
      ) {
        this.employeeTasksEntityService
          .update({
            _id,
            status: 'Failed',
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe()
          .unsubscribe();
      }
    });
  }

  failManagerTasks(tasks: Task[]) {
    tasks.forEach(({ end, _id, status }) => {
      if (
        new Date(end).getTime() < new Date().getTime() &&
        status === 'Assigned'
      ) {
        this.managerTaskEntityService
          .update({
            _id,
            status: 'Failed',
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe()
          .unsubscribe();
      }
    });
  }

  isLoggedIn$ = this.store.pipe(select(isLoggedIn));
  isLoggedOut$ = this.store.pipe(select(isLoggedOut));
}
