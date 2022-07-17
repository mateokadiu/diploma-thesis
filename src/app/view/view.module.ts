import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { FilterStatePipe } from './pipes/filter-state.pipe';
import { MatCardModule } from '@angular/material/card';
import { UsersResolver } from '../services/user/users.resolver';
import { EmployeeTasksResolver } from '../services/employee/employee-tasks.resolver';
import { ManagerTasksResolver } from '../services/manager/manager-tasks.resolver';
import { UserEntityService } from '../services/user/user-entity.service';
import { UserDataService } from '../services/user/user-data.service';
import { ManagerTaskDataService } from '../services/manager/manager-tasks-data.service';
import { EmployeeTaskDataService } from '../services/employee/employee-tasks-data.service';
import { ManagerTaskEntityService } from '../services/manager/manager-task-entity.service';
import { EmployeeTaskEntityService } from '../services/employee/employee-task-entity.service';
@NgModule({
  declarations: [HomeComponent, FilterStatePipe],
  imports: [
    CommonModule,
    ViewRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    SharedModule,
  ],
  providers: [
    UsersResolver,
    EmployeeTasksResolver,
    ManagerTasksResolver,
    UserEntityService,
    UserDataService,
    ManagerTaskDataService,
    EmployeeTaskDataService,
    ManagerTaskEntityService,
    EmployeeTaskEntityService,
  ],
})
export class ViewModule {}
