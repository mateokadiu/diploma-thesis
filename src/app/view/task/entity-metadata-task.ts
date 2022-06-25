import { EntityMetadataMap } from '@ngrx/data';
import { Task } from 'src/app/interfaces/task.interface';

export const entityMetadataTask: EntityMetadataMap = {
  Task: {
    selectId: (task: Task) => task?._id as any,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
};
