import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';
import { authFeatureKey, AuthState } from '../reducers';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const getLoggedUserData = createSelector(
  selectAuthState,
  (authState) => authState.user as User
);

export const isLoggedIn = createSelector(
  selectAuthState,
  (authState) => !!authState.user
);

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);

export const userId = createSelector(
  getLoggedUserData,
  (userData) => userData._id as string
);
