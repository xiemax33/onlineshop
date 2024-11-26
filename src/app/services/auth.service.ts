import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private isAuthenticated: boolean = false;
  private loginEndpoint: string = 'https://fakestoreapi.com/auth/login';

  constructor(
    private http: HttpClient,
    private router: Router
) {}

  async login(username: string, password: string): Promise<boolean> {
    if (!username ||!password) {
      return false;
    }

    // Simulate login logic with a backend API
    const response:any = await this.http.post(this.loginEndpoint, { username, password }).toPromise();
    if (response) {
      console.log('login response : ', JSON.stringify(jwtDecode(response.token)))
      
      this.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(jwtDecode(response.token)));
      localStorage.setItem('token', response.token);
      return true;
    }

    return false;
  }
  
  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }
  
  getCurrentUser(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).user : null;
  }

  getCurrentId(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).sub : null;
  }
  getCurrentToken(): string | null {
    const token = localStorage.getItem('token');
    return token ? token : null;
  }
}