import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, delay, tap } from 'rxjs/operators';
import { login, animationDash, animationLogin, productList, authenticated, animationDashWithLogin, cashback, callcash, logout } from '../actions/app.actions';
import { Router, NavigationExtras } from '@angular/router';
import { mockProductList } from './../../mocks/products';
import { CryptService } from './../../shared/crypt/crypt.service';
import { StorageService } from './../../shared/storage/storage.service';
import { User, Login } from './../../models/login.interface';

import * as cryptojs from 'crypto-js';
import { CashService } from './../../shared/cash/cash.service';
import { Cash } from 'src/app/models/cashback.interface';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private readonly router: Router,
    private readonly crypt: CryptService,
    private readonly storage: StorageService,
    private readonly cash: CashService,
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    mergeMap((action) => {

      const hash = this.crypt.hash();
      const usernameEncrypted = this.crypt.encrypt(action.username, hash);
      const passwordEncrypted = this.crypt.encrypt(action.password, hash);

      this.storage.set('username', usernameEncrypted + '-' + hash);
      this.storage.set('password', passwordEncrypted + '-' + hash);

      return [animationDash(), animationLogin()];
    })
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    tap(() => {
      this.storage.remove('username');
      this.storage.remove('password');

      this.router.navigate(['/login']);
    })
  ), { dispatch: false });

  authenticated$ = createEffect(() => this.actions$.pipe(
    ofType(authenticated),
    mergeMap(() => {
      const user: Login = {
        username: this.storage.get('username'),
        password: this.storage.get('password')
      };
      const username = {
        encrypted: this.crypt.getEncrypt(user.username),
        hash: this.crypt.getHash(user.username)
      };
      const password = {
        encrypted: this.crypt.getEncrypt(user.password),
        hash: this.crypt.getHash(user.password)
      };

      user.username = this.crypt.decrypt(username.encrypted, username.hash);
      user.password = this.crypt.decrypt(password.encrypted, password.hash);

      let credit;
      this.cash.getCashback(user.username).subscribe(res => {
        credit = res.body;
      });
      // credit = this.cash.getCashback(user.username);

      return [animationDashWithLogin(user), productList({products: mockProductList}), callcash(user)];
    })
  ));

  effectName$ = createEffect(() => this.actions$.pipe(
    ofType(callcash),
    mergeMap(action => this.cash.getCashback(action.username)
      .pipe(
        map(res => cashback(res.body))
      )
    )
  ));

  animationLogin$ = createEffect(() => this.actions$.pipe(
    ofType(animationLogin),
    delay(3 * 1000),
    map(() => {
      this.router.navigate(['/dashboard']);
      return productList({products: mockProductList});
    })
  ));

}
