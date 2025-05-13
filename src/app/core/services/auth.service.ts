import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

export interface User {
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string; // optional avatar field
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  // Store registered users - in a real app, this would be server-side
  private registeredUsers: { [key: string]: any } = {};

  constructor(private router: Router) {
    // Initialize with any existing registered users from localStorage
    const storedUsers = localStorage.getItem('registered_users');
    if (storedUsers) {
      this.registeredUsers = JSON.parse(storedUsers);
    }
  }

  register(data: RegisterData): Observable<boolean> {
    // Check if username or email already exists
    if (this.registeredUsers[data.username]) {
      return throwError(() => new Error('Username already exists'));
    }

    if (Object.values(this.registeredUsers).some(
      (user: any) => user.email === data.email
    )) {
      return throwError(() => new Error('Email already exists'));
    }

    // Store the new user (excluding password in the User object)
    const newUser: User = {
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName
    };

    // Store user with password for authentication
    this.registeredUsers[data.username] = {
      ...newUser,
      password: data.password // In a real app, this would be hashed
    };

    // Persist registered users
    localStorage.setItem('registered_users', JSON.stringify(this.registeredUsers));

    // Auto login after registration
    return this.login(data.username, data.password);
  }

  login(username: string, password: string): Observable<boolean> {
    // Check if this is a registered user
    const user = this.registeredUsers[username];

    if (user && user.password === password) {
      // Valid login
      const mockToken = "mock-jwt-token-" + Date.now();
      localStorage.setItem("auth_token", mockToken);
      localStorage.setItem("user", JSON.stringify({
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl
      }));

      this.isLoggedInSubject.next(true);
      return new BehaviorSubject<boolean>(true).asObservable();
    } else if (Object.keys(this.registeredUsers).length === 0) {
      // No registered users yet, allow any login for demo
      const mockToken = "mock-jwt-token";
      localStorage.setItem("auth_token", mockToken);
      localStorage.setItem("user", JSON.stringify({ username }));

      this.isLoggedInSubject.next(true);
      return new BehaviorSubject<boolean>(true).asObservable();
    } else {
      // Invalid login
      return throwError(() => new Error('Invalid username or password'));
    }
  }

  logout(): void {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    this.isLoggedInSubject.next(false);
    this.router.navigate(["/login"]);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem("auth_token");
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  /**
   * Update the user's avatar (Base64 URL or uploaded URL)
   */
  updateAvatar(avatarUrl: string): void {
    const user = this.getCurrentUser();
    if (user) {
      user.avatarUrl = avatarUrl;
      localStorage.setItem('user', JSON.stringify(user));
      this.isLoggedInSubject.next(true);
    }
  }
}
