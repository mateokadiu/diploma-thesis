import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { TaskManagementComponent } from './task-management/task-management.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import { ManagerTaskDataService } from 'src/app/services/manager/manager-tasks-data.service';
import { ManagerTasksResolver } from 'src/app/services/manager/manager-tasks.resolver';
import { ManagerTaskEntityService } from 'src/app/services/manager/manager-task-entity.service';

@NgModule({
  declarations: [TaskManagementComponent, TaskDialogComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    TextFieldModule,
    MatCardModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
  ],
  providers: [
    ManagerTasksResolver,
    ManagerTaskDataService,
    ManagerTaskEntityService,
  ],
})
export class ManagerModule {}
