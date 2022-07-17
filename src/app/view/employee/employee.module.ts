import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { TaskCalendarComponent } from './task-calendar/task-calendar.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeTasksResolver } from 'src/app/services/employee/employee-tasks.resolver';
import { EmployeeTaskDataService } from 'src/app/services/employee/employee-tasks-data.service';
import { EmployeeTaskEntityService } from 'src/app/services/employee/employee-task-entity.service';

@NgModule({
  declarations: [TaskCalendarComponent, TaskDialogComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    EmployeeTasksResolver,
    EmployeeTaskDataService,
    EmployeeTaskEntityService,
  ],
})
export class EmployeeModule {}
