import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route, state: RouterStateSnapshot ) {
    return this.auth.user$.map(user =>{
      if (user) return true;

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
      return false;
    });
  }
}
