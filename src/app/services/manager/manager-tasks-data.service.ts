import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { fi } from 'date-fns/locale';
import { map, Observable, tap } from 'rxjs';
import { AuthState } from 'src/app/auth/reducers';
import { userId } from 'src/app/auth/selectors/auth.selectors';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable()
export class ManagerTaskDataService
  extends DefaultDataService<Task>
  implements OnInit
{
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store<AuthState>
  ) {
    super('Manager', http, httpUrlGenerator);
    store
      .pipe(
        select(userId),
        tap((id) => {
          if (id) {
            this.uId = id;
          }
        })
      )
      .subscribe();
  }

  token!: string;

  uId!: string;

  ngOnInit() {}

  override getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(
      `http://localhost:3000/api/tasks/manager/${this.uId}`
    );
  }

  override update(update: Update<Task>): Observable<Task> {
    return this.http.patch<Task>(
      `http://localhost:3000/api/task/${update.id}`,
      update.changes
    );
  }

  override add(entity: Task): Observable<Task> {
    return this.http.post<Task>('http://localhost:3000/api/task', entity);
  }

  override delete(key: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/task/${key}`);
  }
}
