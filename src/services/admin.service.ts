import { Injectable, Inject }    from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Config } from './config';

@Injectable()
export class AdminService {
  public getUsers(cb: any): void {
    this.authHttp.get(this.config.apiUrl + 'protected/users').subscribe(
      (response: any): void => cb(response.json().error, response.json().users),
      (error: any): void => cb(error.text()));
  }

  public addUser(data: any, cb: any): void {
    this.authHttp.post(this.config.apiUrl + 'protected/create-user', data).subscribe(
      (response: any): void => cb(response.json().error, response.json().user),
      (error: any): void => cb(error.text()));
  }

  public changeUser(data: any, cb: any): void {
    this.authHttp.put(this.config.apiUrl + 'protected/edit-user', data).subscribe(
      (response: any): void => cb(response.json().error, response.json().user),
      (error: any): void => cb(error.text()));
  }

  public deleteUser(data: any, cb: any): void {
    this.authHttp.delete(this.config.apiUrl + 'protected/delete-user/' + data._id).subscribe(
      (response: any): void => cb(response.json().error),
      (error: any): void => cb(error.text()));
  }

  public constructor(public authHttp: AuthHttp, @Inject(Config) public config: any) { }
}
