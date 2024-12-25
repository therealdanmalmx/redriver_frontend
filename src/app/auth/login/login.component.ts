import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule, NgIf],
  providers: [ApiService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {
  http = inject(ApiService);
  router = inject(Router);
  toastr = inject(ToastrService);
  isSubmitting = false;

  username = '';
  password = '';

  onLogin() {
    this.isSubmitting = true;
    if (!this.username || !this.password) {
      this.toastr.warning('Username and password are required.');
      this.isSubmitting = false;
      return;
    }
    this.http.login(this.username, this.password).subscribe({
      next: (response: any) => {
        if (response.includes('false')) {
          this.toastr.error('Invalid username or password.');
          this.isSubmitting = false;
          return;
        }
        localStorage.setItem('token', response);
        this.toastr.success('Logged in successfully.');
        this.router.navigateByUrl('books');
        this.isSubmitting = false;
      },
      error: (error) => {
        this.toastr.error('Error logging in:', error);
        this.isSubmitting = false;
      },
    });
  }

  onLogout() {
    localStorage.removeItem('token');
  }
}
