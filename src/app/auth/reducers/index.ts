import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';
import { AuthActions } from '../actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user?: User;
}

const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return { user: action.user };
  }),
  on(AuthActions.signup, (state, action) => {
    return { user: action.user };
  }),
  on(AuthActions.logout, (state, action) => {
    console.log('here');
    return { user: undefined };
  })
);
