import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';
import { AuthState } from '../reducers';

export const login = createAction(
  '[Login Page] User Login',
  props<{ tokens: { accessToken: string; refreshToken: string } }>()
);

export const triggeredOnRefresh = createAction(
  '[On Refresh] User Refresh',
  props<AuthState>()
);

export const logUserData = createAction(
  '[Login Page] User Data Loaded',
  props<{ user?: User }>()
);

export const loggedUser = createAction(
  '[On Refresh Effect] User Refresh Effect',
  props<AuthState>()
);

export const logout = createAction('[Logout Link] User Logout');

export const updateAccount = createAction(
  '[User Settings Modal] User Edit',
  props<{ user: any }>()
);
