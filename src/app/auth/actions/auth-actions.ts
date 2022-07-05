import { createAction, props } from '@ngrx/store';
import { AuthState } from '../reducers';

export const login = createAction(
  '[Login Page] User Login',
  props<AuthState>()
);

export const logout = createAction('[Logout Link] User Logout');

export const updateAccount = createAction(
  '[User Settings Modal] User Edit',
  props<{ user: any }>()
);
