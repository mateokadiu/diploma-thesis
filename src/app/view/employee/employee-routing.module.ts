import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskCalendarComponent } from './task-calendar/task-calendar.component';

const routes: Routes = [
  {
    path: 'task',
    component: TaskCalendarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
