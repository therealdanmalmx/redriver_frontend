import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
})
export class NavbarComponent {
  http = inject(ApiService);
  router = inject(Router);
  logo = 'assets/logo.png';
  loggedIn = localStorage.getItem('token');

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }
}
