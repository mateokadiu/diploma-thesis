import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { HomeComponent } from './home/home.component';
import { UserDataService } from '../services/user/user-data.service';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { UserEntityService } from '../services/user/user-entity.service';
import { UsersResolver } from '../services/user/users.resolver';
import { ManagerTaskDataService } from '../services/manager/manager-tasks-data.service';
import { entityMetadataMap } from './entity-metadata-map';
import { EmployeeTaskDataService } from '../services/employee/employee-tasks-data.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, ViewRoutingModule],
  providers: [
    UsersResolver,
    UserEntityService,
    UserDataService,
    ManagerTaskDataService,
    EmployeeTaskDataService,
  ],
})
export class ViewModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private managerTasksDataService: ManagerTaskDataService,
    private usersDataService: UserDataService,
    private employeeTasksDataService: EmployeeTaskDataService
  ) {
    eds.registerMetadataMap(entityMetadataMap);
    entityDataService.registerServices({
      Manager: managerTasksDataService,
      User: usersDataService,
      Employee: employeeTasksDataService,
    });
  }
}
