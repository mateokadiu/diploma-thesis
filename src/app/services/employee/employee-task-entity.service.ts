import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable()
export class EmployeeTaskEntityService extends EntityCollectionServiceBase<Task> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Employee', serviceElementsFactory);
  }
}
