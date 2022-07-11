import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { AuthState } from 'src/app/auth/reducers';
import { getLoggedUserData } from 'src/app/auth/selectors/auth.selectors';
import { User } from 'src/app/interfaces/user.interface';

@Injectable()
export class UserDataService extends DefaultDataService<User> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store<AuthState>
  ) {
    httpUrlGenerator.entityResource('User', 'http://localhost:3000/api', true);
    super('User', http, httpUrlGenerator);
    store
      .pipe(
        select(getLoggedUserData),
        tap((u) => (this.userData = u))
      )
      .subscribe();
  }

  userData!: User;

  override getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(
        `http://localhost:3000/api/users/employee/${this.userData?._id}`
      )
      .pipe(
        map((data) => {
          if (this.userData?.role === 'Employee') {
            return [];
          } else if (this.userData?.role === 'Manager') {
            return data.filter(
              (user) =>
                user?._id !== this.userData?._id && user?.role === 'Employee'
            );
          } else {
            return [];
          }
        })
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
    return this.http.delete<any>(`http://localhost:3000/api/user/${key}`);
  }
}
