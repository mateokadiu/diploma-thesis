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
  tokens?: { accessToken: string; refreshToken: string };
}

const initialAuthState: AuthState = {
  user: undefined,
  tokens: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return { ...state, tokens: action.tokens };
  }),
  on(AuthActions.logUserData, (state, action) => {
    return { ...state, user: action.user };
  }),
  on(AuthActions.loggedUser, (state, action) => {
    return { user: action.user, tokens: action.tokens };
  }),
  on(AuthActions.triggeredOnRefresh, (state, action) => {
    return { user: action.user, tokens: action.tokens };
  }),
  on(AuthActions.logout, (state, action) => {
    return { user: undefined };
  }),
  on(AuthActions.updateAccount, (state, action) => {
    return { user: { ...state.user, ...action.user } };
  })
);
