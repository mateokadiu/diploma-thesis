import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { filter, first, Observable, tap } from 'rxjs';
import { UserEntityService } from './user-entity.service';

@Injectable()
export class UsersResolver implements Resolve<boolean> {
  constructor(private userEntityService: UserEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.userEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.userEntityService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
