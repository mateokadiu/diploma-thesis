import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksResolver } from 'src/app/services/task/tasks.resolver';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';

const routes: Routes = [
  {
    path: 'test',
    component: EventCalendarComponent,
    resolve: {
      tasks: TasksResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
