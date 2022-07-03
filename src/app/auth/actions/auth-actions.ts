import { createAction, props } from '@ngrx/store';
import { AuthState } from '../reducers';

export const login = createAction(
  '[Login Page] User Login',
  props<AuthState>()
);

export const signup = createAction(
  '[Signup Page] User Signup',
  props<AuthState>()
);
