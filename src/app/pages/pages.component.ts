import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../models/app.interface';
import { State } from '../store/reducers';
import { selectBg } from '../store/reducers/app.selectors';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.sass']
})
export class PagesComponent implements OnInit {

  @ViewChild('bg', { static: true }) bg: ElementRef;

  background$: Observable<string>;
  background: string;

  constructor(
    private readonly store: Store<State>,
  ) { }

  ngOnInit() {
    this.background$ = this.store.pipe(select(selectBg));
    this.background$.subscribe(bg => {
      this.background = bg;
      this.bg.nativeElement.classList = bg;
    });
  }

}
