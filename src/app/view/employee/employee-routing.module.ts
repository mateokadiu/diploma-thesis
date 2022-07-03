import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTasksResolver } from 'src/app/services/employee/employee-tasks.resolver';
import { TaskCalendarComponent } from './task-calendar/task-calendar.component';

const routes: Routes = [
  {
    path: 'task',
    component: TaskCalendarComponent,
    resolve: { EmployeeTasksResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
