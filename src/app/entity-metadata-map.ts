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
    sortComparer: compareTasks,
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
    sortComparer: compareTasks,
  },
};

export function compareTasks(t1: Task, t2: Task) {
  const compareTasks = new Date(t1.end).getTime() - new Date(t2.end).getTime();

  if (compareTasks > 0) {
    return 1;
  } else if (compareTasks < 0) {
    return -1;
  } else {
    return new Date(t1.end).getDate() - new Date(t2.end).getDate();
  }
}
