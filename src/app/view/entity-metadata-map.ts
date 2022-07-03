import { EntityMetadataMap } from '@ngrx/data';
import { Task } from 'src/app/interfaces/task.interface';
import { User } from 'src/app/interfaces/user.interface';

export const entityMetadataMap: EntityMetadataMap = {
  Manager: {
    selectId: (task: Task) => task?._id as string,
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: true,
      optimisticSaveEntities: true,
    },
  },
  User: {
    selectId: (user: User) => user?._id as string,
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: true,
      optimisticSaveEntities: true,
    },
  },
  Employee: {
    selectId: (task: Task) => task._id as string,
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: true,
      optimisticSaveEntities: true,
    },
  },
};
