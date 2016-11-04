import { Injectable, Inject }    from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from './headers';
import { Config } from './config';

@Injectable()
export class UserService {
  private user: any = {};

  public clearUser(): void {
    this.user = {};
  }

  public getCurrent(update: any, cb: any): any {
    if (typeof cb === 'undefined') {
      cb = update;
    }
    if (this.user._id && !update) {
      return cb(null, this.user);
    }
    this.authHttp.get(this.config.apiUrl + 'sessions/current').subscribe(
      (response: any): void => {
        if (response.json().error) {
          return cb(response.json().error);
        }
        this.user = response.json().user;
        cb(response.json().error, this.user);
      },
      (error: any): void => cb(error.text()));
  }

  public createSession(data: any, cb: any): void {
    this.http.post(this.config.apiUrl + 'sessions/create', data, { headers: contentHeaders }).subscribe(
      (response: any): void => {
        if (response.json().error) {
          return cb(response.json().error);
        }
        localStorage.setItem('id_token', response.json().id_token);
        cb(response.json().error);
      },
      (error: any): void => cb(error.text()));
  }

  public createUser(data: any, cb: any): void {
    this.http.post(this.config.apiUrl + 'sessions/create-user', data, { headers: contentHeaders }).subscribe(
      (response: any): void => {
        if (response.json().error) {
          return cb(response.json().error);
        }
        localStorage.setItem('id_token', response.json().id_token);
        cb(response.json().error);
      },
      (error: any): void => cb(error.text()));
  }

  public changePassword(data: any, cb: any): void {
    this.authHttp.put(this.config.apiUrl + 'user/password', data).subscribe(
      (response: any): void => cb(response.json().error),
      (error: any): void => cb(error.text()));
  }

  public constructor(private http: Http, public authHttp: AuthHttp, @Inject(Config) public config: any) { }
}
