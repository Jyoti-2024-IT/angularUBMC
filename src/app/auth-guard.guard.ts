import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RegistrationService } from './services/registration.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: RegistrationService, public router: Router) {}
  canActivate(): boolean {
    // console.log('================== In AuthGuard ==================');
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
