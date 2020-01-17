import { Component, OnInit } from '@angular/core';
import { Product } from './../../models/products.interface';
import { Store, select } from '@ngrx/store';
import { State } from './../../store/reducers';
import { Observable } from 'rxjs';
import { selectProducts, selectCredits } from './../../store/reducers/app.selectors';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from './../../models/login.interface';
import { CashService } from './../../shared/cash/cash.service';
import { Cash } from './../../models/cashback.interface';
import { logout } from './../../store/actions/app.actions';

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.sass']
})
export class PageDashboardComponent implements OnInit {

  credit$: Observable<any>;
  credit: any;

  productList$: Observable<Product[]>;
  productList: Product[];
  categories: string[] = [];
  sessionId: Observable<string>;

  constructor(
    private readonly store: Store<State>,
    private readonly route: ActivatedRoute,
    private readonly cash: CashService,
  ) { }

  ngOnInit() {

    this.productList$ = this.store.pipe(select(selectProducts));
    this.productList$.subscribe(res => {
      this.productList = res;

      for (const product of res) {
        for (const cat of product.categories) {
          if (!this.categories.includes(cat)) {
            this.categories.push(cat);
          }
        }
      }
    });

    this.credit$ = this.store.pipe(select(selectCredits));
  }

  formatCredit(num: number): string {
    if (num) {
      const number = num.toString().split(/([0-9]*)([0-9]{3}$)/gm);
      if (num.toString().length <= 3) {
        return number[2] + ',00';
      } else {
        return number[1] + '.' + number[2] + ',00';
      }
    } else {
      return '';
    }
  }

  logout(): void {
    this.store.dispatch(logout());
  }

}
