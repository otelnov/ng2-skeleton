import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { MainComponent } from '../components/main/main.component';

import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { TopMenuComponent } from '../shared/top-menu/top-menu.component';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { UserComponent } from '../components/user/user.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { AdminComponent } from '../components/admin/admin.component';
import { GuestComponent } from '../components/guest/guest.component';

import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';
import { ConfigProvider } from '../services/config';
import { UserGuard } from '../services/user.guard';
import { AdminGuard } from '../services/admin.guard';

import { routes } from '../router.config';
const routing = RouterModule.forRoot(routes);

export function getAuthHttp(http:any):any {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    noJwtError: true,
    globalHeaders: [
      { 'Accept': 'application/json' },
      { 'Content-Type': 'application/json' }
    ],
    tokenGetter: (() => localStorage.getItem('id_token'))
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopMenuComponent,

    MainComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    SettingsComponent,
    AdminComponent,
    GuestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    AdminService,
    UserService,
    ConfigProvider,
    UserGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
