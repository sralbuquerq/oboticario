import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { State } from './../../store/reducers';
import { animationDash, login } from './../../store/actions/app.actions';
import { Observable, pipe } from 'rxjs';
import { selectLoginEffect } from './../../store/reducers/app.selectors';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.sass']
})
export class PageLoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  loginEffect$: Observable<boolean>;
  loginEffect: boolean;

  @ViewChild('loginContainer', { static: true }) container: ElementRef;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<State>,
  ) { }

  ngOnInit() {
    this.loginEffect$ = this.store.pipe(select(selectLoginEffect));
    this.loginEffect$.subscribe(res => { if (!res) { this.container.nativeElement.classList.add('hide'); }});
  }

  public onSubmit(): void {
    this.store.dispatch(login(this.loginForm.value));
  }

  public isValid(): boolean {
    return this.loginForm.valid;
  }

}
