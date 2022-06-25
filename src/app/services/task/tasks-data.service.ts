import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { map, Observable } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable()
export class TaskDataService extends DefaultDataService<Task> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    httpUrlGenerator.entityResource('Task', 'http://localhost:3000/api', true);
    super('Task', http, httpUrlGenerator);
  }

  override getAll(): Observable<Task[]> {
    return this.http
      .get('http://localhost:3000/api/tasks')
      .pipe(map((res: any) => res['payload']));
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
