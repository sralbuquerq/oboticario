import { State } from '.';

export const selectBg = (state: State) => state.app.appearance.bg;
export const selectLoginEffect = (state: State) => state.app.appearance.login;
export const selectProducts = (state: State) => state.app.products;
export const selectCredits = (state: State) => state.app.cashback.credit;
