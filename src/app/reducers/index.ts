import {
  ActionReducer,
  ActionReducerMap,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  INIT,
  MetaReducer,
  on,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AuthState } from '../auth/reducers';

export interface AppState {
  auth?: AuthState;
  entityCache?: any;
}

export const reducers: ActionReducerMap<AppState> = {};

export function logoutFunction(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state, action) => {
    if (action != null && action.type === '[Logout Link] User Logout') {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logoutFunction]
  : [logoutFunction];
