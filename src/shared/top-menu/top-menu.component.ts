import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.html'
})
export class TopMenuComponent {
  public constructor(public router: Router, private userService: UserService) { }

  public logout(): void {
    localStorage.removeItem('id_token');
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
}
