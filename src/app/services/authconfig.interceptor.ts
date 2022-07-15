import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { AuthState } from '../auth/reducers';
import { selectAccessToken } from '../auth/selectors/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AuthState>) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authToken;
    this.store
      .pipe(
        select(selectAccessToken),
        tap((accessToken) => (authToken = accessToken))
      )
      .subscribe();
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return next.handle(req);
  }
}
