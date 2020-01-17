import { createSelector, createReducer, Action, on } from '@ngrx/store';
import { AppState } from './../../models/app.interface';
import * as AppActions from './../actions/app.actions';
import { State } from '.';

export const initialState: AppState = {
  appearance: {
    bg: 'bg',
    login: true
  },
  user: {},
  products: [],
  cashback: {}
};

const appReducer = createReducer(
  initialState,
  on(AppActions.login, (state, user) => ({
    ...state,
    user: {
      ...state.user,
      login: {
        username: user.username,
        password: user.password,
        ...state.user.login,
      }
    }
  })),
  on(AppActions.logout, (state) => ({
    ...initialState
  })),
  on(AppActions.animationDashWithLogin, (state, user) => ({
    ...state,
    appearance: {
      ...state.appearance,
      bg: 'bg white',
      login: false
    },
    user: {
      ...state.user,
      login: {
        username: user.username,
        password: user.password,
        ...state.user.login,
      }
    }
  })),
  on(AppActions.animationDash, state => ({
    ...state,
    appearance: {
      ...state.appearance,
      bg: 'bg white',
      login: false
    }
  })),
  on(AppActions.productList, (state, list) => ({
    ...state,
    products: list.products
  })),
  on(AppActions.cashback, (state, cash) => ({
    ...state,
    cashback: {
      ...state.cashback,
      credit: cash.credit
    }
  })),
);

export function reducer(state: AppState, action: Action) {
  return appReducer(state, action);
}
