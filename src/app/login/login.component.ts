import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  isLoggingIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.isLoggingIn = true;

    // For demo purposes, any username/password combo works
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/profile']);
          }
        },
        error: (err) => {
          this.error = err.message || 'Login failed. Please try again.';
          this.isLoggingIn = false;
        },
        complete: () => {
          this.isLoggingIn = false;
        }
      });
    }
  }
}
