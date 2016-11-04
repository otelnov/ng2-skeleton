import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'login',
  templateUrl: './login.html'
})
export class LoginComponent {
  public error: string = '';
  public constructor(public router: Router, public userService: UserService) {
    if (tokenNotExpired()) {
      this.router.navigate(['/']);
      return;
    }
    let query_string: any = {};
    let query = window.location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=');
      if (typeof query_string[pair[0]] === 'undefined') {
        query_string[pair[0]] = decodeURIComponent(pair[1]);
      } else if (typeof query_string[pair[0]] === 'string') {
        let arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
        query_string[pair[0]] = arr;
      } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }
    if (query_string.id_token) {
      localStorage.setItem('id_token', query_string.id_token);
      this.router.navigate(['/']);
      return;
    }
  }

  public login(event: any, email: any, password: any): void {
    event.preventDefault();
    let body = JSON.stringify({ email, password });
    this.userService.createSession(body, (err: any) => {
      if (err) {
        this.error = err;
        return;
      }
      this.router.navigate(['/']);
    });
  }
}
