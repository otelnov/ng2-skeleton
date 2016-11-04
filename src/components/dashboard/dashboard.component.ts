import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html'
})
export class DashboardComponent {
  private jwtHelper: JwtHelper = new JwtHelper();
  public constructor(public userService: UserService) {
    console.log(this.jwtHelper.decodeToken(localStorage.getItem('id_token')));
  }
}
