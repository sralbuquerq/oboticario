import { createAction, props } from '@ngrx/store';
import { Login, User } from './../../models/login.interface';
import { Product } from './../../models/products.interface';
import { Cash } from 'src/app/models/cashback.interface';

export const login = createAction('[Login] User joined', props<Login>());
export const logout = createAction('[Login] User left');
export const authenticated = createAction('[Dashboard] User authenticated');
export const animationLogin = createAction('[Animation] Hide the PageLogin');
export const animationDash = createAction('[Animation] Transition to Dashboard');
export const animationDashWithLogin = createAction('[Animation] Transition to Dashboard With Login', props<Login>());
export const productList = createAction('[Dashboard] Products list', props<{products: Product[]}>());
export const callcash = createAction('[Dashboard] Consult cashback credit', props<Login>());
export const cashback = createAction('[Dashboard] Credit collected', props<Cash>());
