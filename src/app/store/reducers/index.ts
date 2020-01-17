import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from './../../../environments/environment';
import { AppState } from './../../models/app.interface';
import { reducer } from './app.reducers';

export interface State {
  app: AppState;
  // portal: portalReducer
}

export const reducers: ActionReducerMap<State> = {
  app: reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
