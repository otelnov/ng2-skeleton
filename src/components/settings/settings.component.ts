import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.html'
})
export class SettingsComponent {
  public password: string;
  public constructor(private userService: UserService) { }
  public changePass():void {
    this.userService.changePassword({ password: this.password }, (err: any) => {
      if(err) {
        console.log(err);
      }
      this.password = '';
      alert('Your password has been saved successfully');
    });
  }
}
