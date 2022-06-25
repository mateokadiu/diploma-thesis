import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable()
export class TaskEntityService extends EntityCollectionServiceBase<Task> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Task', serviceElementsFactory);
  }
}
