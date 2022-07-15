import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';
import { authFeatureKey, AuthState } from '../reducers';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const getLoggedUserData = createSelector(
  selectAuthState,
  (authState) => authState.user as User
);

export const selectEmail = createSelector(
  getLoggedUserData,
  (user) => user?.email as string
);

export const selectAccessToken = createSelector(
  selectAuthState,
  (authState) => authState.tokens?.accessToken
);

export const isLoggedIn = createSelector(
  selectAuthState,
  (authState) => !!authState.user
);

export const isManager = createSelector(
  getLoggedUserData,
  (user) => !!(user?.role === 'Manager')
);

export const isEmployee = createSelector(
  getLoggedUserData,
  (user) => !!(user?.role === 'Employee')
);

export const isAdmin = createSelector(
  getLoggedUserData,
  (user) => !!(user?.role === 'Admin')
);

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);

export const userId = createSelector(
  getLoggedUserData,
  (userData) => userData?._id as string
);

export const selectUserInitials = createSelector(
  getLoggedUserData,
  (user) => user?.firstName[0].toUpperCase() + user?.lastName[0].toUpperCase()
);
