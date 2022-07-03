import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { map, Observable } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable()
export class ManagerTaskDataService
  extends DefaultDataService<Task>
  implements OnInit
{
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Manager', http, httpUrlGenerator);
    const user = localStorage.getItem('diploma-thesis.user');
    if (user) {
      this.userId = JSON.parse(user)._id;
    }
  }

  userId!: string;

  ngOnInit() {}

  override getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(
      `http://localhost:3000/api/tasks/manager/${this.userId}`
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
