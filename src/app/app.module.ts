import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import {
  EntityDataModule,
  EntityDataService,
  EntityDefinitionService,
} from '@ngrx/data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { reducers, metaReducers } from './reducers';
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FooterComponent } from './footer/footer.component';
import { AuthInterceptor } from './services/authconfig.interceptor';
import { EmployeeTaskEntityService } from './services/employee/employee-task-entity.service';
import { ManagerTaskDataService } from './services/manager/manager-tasks-data.service';
import { UserDataService } from './services/user/user-data.service';
import { EmployeeTaskDataService } from './services/employee/employee-tasks-data.service';
import { entityMetadataMap } from './entity-metadata-map';
import { ManagerTaskEntityService } from './services/manager/manager-task-entity.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EntityDataModule.forRoot({}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    EmployeeTaskEntityService,
    ManagerTaskDataService,
    UserDataService,
    EmployeeTaskDataService,
    ManagerTaskEntityService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
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
