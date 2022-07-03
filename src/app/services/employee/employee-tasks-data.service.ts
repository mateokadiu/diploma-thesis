import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable()
export class EmployeeTaskDataService extends DefaultDataService<Task> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Employee', http, httpUrlGenerator);
    const user = localStorage.getItem('diploma-thesis.user');
    if (user) {
      this.userId = JSON.parse(user)._id;
    }
  }

  userId!: string;

  override getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(
      `http://localhost:3000/api/tasks/employee/${this.userId}`
    );
  }

  override update(update: Update<Task>): Observable<Task> {
    return this.http.patch<Task>(
      `http://localhost:3000/api/task/${update.id}`,
      update.changes
    );
  }
}
