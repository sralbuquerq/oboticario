import { User } from './login.interface';
import { Appearance } from './appearance.interface';
import { Product } from './products.interface';
import { Cash } from './cashback.interface';

export interface AppState {
  appearance: Appearance;
  user: User;
  products?: Product[];
  cashback?: Cash;
}
