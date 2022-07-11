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
    return this.http.post<{ user: User; token: string }>(
      `${this.DB_URL}/login`,
      { email, password }
    );
  }

  getUserNumbers() {
    return this.http.get<any>(`${this.DB_URL}/users/numbers`);
  }

  logout() {
    return this.http.get<any>(`${this.DB_URL}/logout`);
  }
  signup(user: User) {
    return this.http.post<User>(`${this.DB_URL}/signup`, user);
  }

  changePassword(data: any) {
    return this.http.post<any>(`${this.DB_URL}/change-password/${data._id}`, {
      password: data.password,
      newPassword: data.newPassword,
    });
  }

  editUser(user: any) {
    return this.http.patch<User>(`${this.DB_URL}/user/${user._id}`, user);
  }

  deleteAccount(userId: string) {
    return this.http.delete<{ message: string }>(
      `${this.DB_URL}/user/${userId}`
    );
  }
}
