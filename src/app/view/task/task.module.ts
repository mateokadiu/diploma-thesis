import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { TaskDataService } from 'src/app/services/task/tasks-data.service';
import { entityMetadataTask } from './entity-metadata-task';
import { TaskEntityService } from 'src/app/services/task/task-entity.service';
import { TasksResolver } from 'src/app/services/task/tasks.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatCardModule } from '@angular/material/card';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [EventCalendarComponent, TaskDialogComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    SharedModule,
    TextFieldModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
  ],
  providers: [TaskDataService, TaskEntityService, TasksResolver],
})
export class TaskModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private tasksDataService: TaskDataService
  ) {
    eds.registerMetadataMap(entityMetadataTask);
    entityDataService.registerService('Task', tasksDataService);
  }
}
