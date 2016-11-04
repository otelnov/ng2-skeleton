import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  host: { '[class.dark]': 'isDark' }
})

export class AppComponent {
  private isDark: boolean;
  public constructor(public router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isDark = event.url === '/login' || event.url === '/signup';
      }
    });
  }
}
