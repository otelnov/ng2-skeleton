import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdminComponent } from './components/admin/admin.component';
import { GuestComponent } from './components/guest/guest.component';
import { UserGuard } from './services/user.guard';
import { AdminGuard } from './services/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    data: ['Login'],
    component: LoginComponent
  },
  {
    path: 'signup',
    data: ['Signup'],
    component: SignupComponent
  },
  {
    path: 'guest',
    data: ['Guest Page'],
    component: GuestComponent
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [UserGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'user', component: UserComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
