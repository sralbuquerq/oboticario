import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from './../../store/reducers';
import { StorageService } from '../storage/storage.service';
import { authenticated } from './../../store/actions/app.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isLoggedIn = false;

  constructor(
    private readonly store: Store<State>,
    // private readonly authService: AuthService,
    private readonly router: Router,
    private readonly storage: StorageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.storage.get('username')) {
        this.store.dispatch(authenticated());
        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }

  checkLogin(url: string): boolean {
    if (this.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;

    // Create a dummy session id
    let sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    };

    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }
}
