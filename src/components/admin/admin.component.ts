import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'users',
  templateUrl: './admin.html'
})
export class AdminComponent implements OnInit {
  public users: any[] = [];
  public ngOnInit(): void {
    this.adminService.getUsers((err: any, users: any[]) => {
      if (err) {
        console.log(err);
      }
      this.users = users;
    });
  }

  public constructor(public adminService: AdminService) {

  }

  public changeStatus(user: any): void {
    user.isActive = !user.isActive;
    this.adminService.changeUser(user, (err: any) => {
      if (err) {
        console.log(err);
      }
    });
  }

  public deleteUser(user: any, index: number): void {
    if (window.confirm('Delete ' + user.email + ' ?')) {
      this.adminService.deleteUser(user, (err: any) => {
        if (err) {
          console.log(err);
          return;
        }
        this.users.splice(index, 1);
      });
    }
  }
}
