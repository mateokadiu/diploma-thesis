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
  token?: string;
}

const initialAuthState: AuthState = {
  user: undefined,
  token: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return { user: action.user, token: action.token };
  }),

  on(AuthActions.logout, (state, action) => {
    return { user: undefined };
  }),
  on(AuthActions.updateAccount, (state, action) => {
    return { user: { ...state.user, ...action.user } };
  })
);
