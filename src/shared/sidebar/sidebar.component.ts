import { Component } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.html',
  providers: [UserService]
})
export class SidebarComponent {
  public user: any = {};
  private jwtHelper: JwtHelper = new JwtHelper();
  public constructor(private userService: UserService) {
    this.userService.getCurrent(false, (err: any, user: any) => {
      console.log(err, user);
    });
    this.user = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
  }
}
