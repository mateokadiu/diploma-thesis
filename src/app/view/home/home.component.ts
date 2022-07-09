import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { AuthState } from 'src/app/auth/reducers';
import { getLoggedUserData } from 'src/app/auth/selectors/auth.selectors';
import { Task } from 'src/app/interfaces/task.interface';
import { User } from 'src/app/interfaces/user.interface';
import { EmployeeTaskEntityService } from '../services/employee/employee-task-entity.service';
import { ManagerTaskEntityService } from '../services/manager/manager-task-entity.service';
import { UserEntityService } from '../services/user/user-entity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private employeeTasksEntityService: EmployeeTaskEntityService,
    private managerTaskEntityService: ManagerTaskEntityService,
    private userEntityService: UserEntityService,
    private store: Store<AuthState>,
    private title: Title
  ) {
    this.title.setTitle('Home');

    store
      .pipe(
        select(getLoggedUserData),
        tap((u) => (this.user = u)),
        takeUntil(this.destroy$)
      )
      .subscribe();

    employeeTasksEntityService.entities$
      .pipe(
        tap((tasks) =>
          tasks.forEach(({ end, _id, status }) => {
            if (
              new Date(end).getTime() < new Date().getTime() &&
              status === 'Assigned'
            ) {
              managerTaskEntityService
                .update({
                  _id,
                  status: 'Failed',
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe();
            }
          })
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();

    managerTaskEntityService.entities$
      .pipe(
        tap((tasks) =>
          tasks.forEach(({ end, _id, status }) => {
            if (
              new Date(end).getTime() < new Date().getTime() &&
              status === 'Assigned'
            ) {
              managerTaskEntityService
                .update({
                  _id,
                  status: 'Failed',
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe();
            }
          })
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  destroy$: Subject<boolean> = new Subject<boolean>();

  user!: User;

  users$!: Observable<User[]>;

  selectedEmail!: string;
  stateSubject = new BehaviorSubject(this.selectedEmail);

  assigned$!: Observable<Task[]>;
  completed$!: Observable<Task[]>;
  failed$!: Observable<Task[]>;

  assignedUser$!: Observable<Task[]>;
  completedUser$!: Observable<Task[]>;
  failedUser$!: Observable<Task[]>;
  ngOnInit(): void {
    this.assigned$ = this.employeeTasksEntityService.entities$.pipe(
      map((data) => data.filter((task) => task.status === 'Assigned')),
      takeUntil(this.destroy$)
    );

    this.completed$ = this.employeeTasksEntityService.entities$.pipe(
      map((data) => data.filter((task) => task.status === 'Completed')),
      takeUntil(this.destroy$)
    );

    this.failed$ = this.employeeTasksEntityService.entities$.pipe(
      map((data) => data.filter((task) => task.status === 'Failed')),
      takeUntil(this.destroy$)
    );

    this.users$ = this.userEntityService.entities$;

    this.assignedUser$ = this.managerTaskEntityService.entities$.pipe(
      map((data) => data.filter((task) => task.status === 'Assigned')),
      takeUntil(this.destroy$)
    );
    this.completedUser$ = this.managerTaskEntityService.entities$.pipe(
      map((data) => data.filter((task) => task.status === 'Completed')),
      takeUntil(this.destroy$)
    );
    this.failedUser$ = this.managerTaskEntityService.entities$.pipe(
      map((data) => data.filter((task) => task.status === 'Failed')),
      takeUntil(this.destroy$)
    );

    if (this.user.role == 'Manager') {
      this.userEntityService.entities$
        .pipe(tap((u) => (this.selectedEmail = u[0].email)))
        .subscribe()
        .unsubscribe();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
