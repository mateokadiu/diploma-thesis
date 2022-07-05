import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import {
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { AuthState } from 'src/app/auth/reducers';
import {
  getLoggedUserData,
  selectEmail,
} from 'src/app/auth/selectors/auth.selectors';
import { Task } from 'src/app/interfaces/task.interface';
import { User } from 'src/app/interfaces/user.interface';

@Injectable()
export class EmployeeTaskDataService extends DefaultDataService<Task> {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store<AuthState>
  ) {
    super('Employee', http, httpUrlGenerator);
    store
      .pipe(
        select(getLoggedUserData),
        tap((e) => {
          if (e) {
            this.user = e;
          }
        }),
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe();
  }

  user!: User;

  override getAll(): Observable<Task[]> {
    return this.http
      .get<Task[]>(
        `http://localhost:3000/api/tasks/employee/${this.user?.email}`
      )
      .pipe(
        map((data) => {
          if (this.user.role === 'Employee') {
            return data;
          }
          return [];
        })
      );
  }

  override update(update: Update<Task>): Observable<Task> {
    return this.http.patch<Task>(
      `http://localhost:3000/api/task/${update.id}`,
      update.changes
    );
  }

  onDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
