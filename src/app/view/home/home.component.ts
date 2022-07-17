import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { fi } from 'date-fns/locale';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  interval,
  map,
  noop,
  Observable,
  shareReplay,
  Subject,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { triggeredOnRefresh } from 'src/app/auth/actions/auth-actions';
import { AuthState } from 'src/app/auth/reducers';
import {
  getLoggedUserData,
  selectAuthState,
} from 'src/app/auth/selectors/auth.selectors';
import { Task } from 'src/app/interfaces/task.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeTaskEntityService } from 'src/app/services/employee/employee-task-entity.service';
import { ManagerTaskEntityService } from 'src/app/services/manager/manager-task-entity.service';
import { UserEntityService } from 'src/app/services/user/user-entity.service';

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
    private authService: AuthService,
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
  }

  destroy$: Subject<boolean> = new Subject<boolean>();

  user!: User;

  users$!: Observable<User[]>;

  adminStats: any;

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

    if (this.user.role == 'Admin') {
      this.authService
        .getUserNumbers()
        .pipe(
          tap((stats) => (this.adminStats = stats)),
          takeUntil(this.destroy$)
        )
        .subscribe(noop);
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
