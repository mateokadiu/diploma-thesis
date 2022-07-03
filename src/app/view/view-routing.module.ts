import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadEmployeeGuard } from '../guards/users/can-load-employee.guard';
import { CanLoadManagerGuard } from '../guards/users/can-load-manager.guard';
import { UsersResolver } from '../services/user/users.resolver';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      User: UsersResolver,
    },
  },
  {
    path: 'manager',
    loadChildren: () =>
      import('./manager/manager.module').then((m) => m.ManagerModule),
    canLoad: [CanLoadManagerGuard],
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
    canLoad: [CanLoadEmployeeGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule {}
