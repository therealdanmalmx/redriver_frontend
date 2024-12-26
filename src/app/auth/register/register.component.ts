import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';

@Component({
  imports: [RouterLink, FormsModule, CommonModule],
  providers: [ApiService, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
})
export class RegisterComponent {
  http = inject(ApiService);
  router = inject(Router);
  toastr = inject(ToastrService);
  isSubmitting = false;

  username = '';
  password = '';

  onRegister() {
    this.isSubmitting = true;
    if (!this.username || !this.password) {
      this.toastr.warning('Username and password are required.');
      this.isSubmitting = false;
      return;
    }

    this.http.register(this.username, this.password).subscribe({
      next: (response: any) => {
        if (!response) {
          this.toastr.error('Error registering.', response.message);
          this.isSubmitting = false;
          return;
        } else {
          this.toastr.success(response.message);
          this.router.navigateByUrl('login');
          this.isSubmitting = false;
        }
      },
      error: () => {
        this.toastr.error('Could not register user.');
        this.isSubmitting = false;
      },
    });
  }
}
