import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadAdminGuard } from '../guards/users/admin/can-load-admin.guard';
import { CanLoadEmployeeGuard } from '../guards/users/can-load-employee.guard';
import { CanLoadManagerGuard } from '../guards/users/can-load-manager.guard';
import { EmployeeTasksResolver } from '../services/employee/employee-tasks.resolver';
import { ManagerTasksResolver } from '../services/manager/manager-tasks.resolver';
import { UsersResolver } from '../services/user/users.resolver';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      User: UsersResolver,
      Manager: ManagerTasksResolver,
      Employee: EmployeeTasksResolver,
    },
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canLoad: [CanLoadAdminGuard],
    resolve: {
      User: UsersResolver,
    },
  },

  {
    path: 'manager',
    loadChildren: () =>
      import('./manager/manager.module').then((m) => m.ManagerModule),
    canLoad: [CanLoadManagerGuard],
    resolve: {
      User: UsersResolver,
      Manager: ManagerTasksResolver,
    },
  },

  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
    canLoad: [CanLoadEmployeeGuard],
    resolve: {
      User: UsersResolver,
      Employee: EmployeeTasksResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule {}
