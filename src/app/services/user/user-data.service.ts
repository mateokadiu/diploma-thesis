import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';

@Injectable()
export class UserDataService extends DefaultDataService<User> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('User', http, httpUrlGenerator);
    const user = localStorage.getItem('diploma-thesis.user');
    if (user) {
      this.userId = JSON.parse(user)._id;
    }
  }

  userId!: string;

  override getAll(): Observable<User[]> {
    return this.http.get<User[]>(
      `http://localhost:3000/api/users/employee/${this.userId}`
    );
  }

  override update(update: Update<User>): Observable<User> {
    return this.http.patch<User>(
      `http://localhost:3000/api/user/${update.id}`,
      update.changes
    );
  }

  override add(entity: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/api/user', entity);
  }

  override delete(key: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/users/${key}`);
  }
}
