import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerTasksResolver } from 'src/app/view/services/manager/manager-tasks.resolver';
import { TaskManagementComponent } from './task-management/task-management.component';

const routes: Routes = [
  {
    path: 'task',
    resolve: {
      ManagerTasksResolver,
    },
    component: TaskManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
