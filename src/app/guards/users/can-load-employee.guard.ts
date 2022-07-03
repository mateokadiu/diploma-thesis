import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/auth/reducers';
import { isEmployee } from 'src/app/auth/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class CanLoadEmployeeGuard implements CanLoad {
  constructor(private store: Store<AuthState>) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(select(isEmployee));
  }
}
