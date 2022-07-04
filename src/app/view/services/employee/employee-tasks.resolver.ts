import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { filter, first, Observable, tap } from 'rxjs';
import { EmployeeTaskEntityService } from './employee-task-entity.service';

@Injectable()
export class EmployeeTasksResolver implements Resolve<boolean> {
  constructor(private taskEntityService: EmployeeTaskEntityService) {}
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
