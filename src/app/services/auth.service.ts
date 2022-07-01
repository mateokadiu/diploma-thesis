import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  DB_URL = 'http://localhost:3000/api';

  login({ email, password }: User) {
    return this.http
      .post<User>(`${this.DB_URL}/login`, { email, password })
      .pipe(tap(console.log));
  }

  signup(user: User) {
    return this.http.post<User>(`${this.DB_URL}/signup`, user);
  }

  getAllUsers() {
    return this.http.get<{ payload: User[] }>(`${this.DB_URL}/users`);
  }

  deleteAccount(userId: string) {
    return this.http.delete<{ message: string }>(
      `${this.DB_URL}/users/${userId}`
    );
  }
}
