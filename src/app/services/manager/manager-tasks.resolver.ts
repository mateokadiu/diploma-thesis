import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { filter, first, Observable, tap } from 'rxjs';
import { ManagerTaskEntityService } from './manager-task-entity.service';

@Injectable()
export class ManagerTasksResolver implements Resolve<boolean> {
  constructor(private taskEntityService: ManagerTaskEntityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.taskEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.taskEntityService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
