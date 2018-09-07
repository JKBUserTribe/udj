import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate( route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('id_token');
    const tokenPayload = decode(token);

    if ( this.authService.loggedIn() || tokenPayload.data.role !== expectedRole ) {
      this.router.navigate(['/']);
      return false;
    }
      return true;
  }
}
