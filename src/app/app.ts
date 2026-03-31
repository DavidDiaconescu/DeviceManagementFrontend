import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isAdmin = false;

  constructor(public authService: AuthService, private router: Router) {
    this.isAdmin = this.authService.getCurrentUserRole() === 'Admin';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
