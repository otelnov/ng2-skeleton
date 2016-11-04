import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'signup',
  templateUrl: './signup.html'
})
export class SignupComponent {
  public error: string = '';
  public constructor(public router: Router, public userService: UserService) {
    if (tokenNotExpired()) {
      this.router.navigate(['/']);
      return;
    }
  }

  public signup(event: any, email: any, password: any): void {
    event.preventDefault();
    let body = JSON.stringify({ email, password });
    this.userService.createUser(body, (err: any) => {
      if (err) {
        this.error = err;
        return;
      }
      this.router.navigate(['/']);
    });
  }
}
