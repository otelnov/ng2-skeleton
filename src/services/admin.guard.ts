import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  private jwtHelper: JwtHelper = new JwtHelper();
  public canActivate(): boolean {
    if (this.jwtHelper.decodeToken(localStorage.getItem('id_token')).isAdmin) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  public constructor(private router: Router) { }
}
