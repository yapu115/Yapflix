import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, protected router: Router) {}

  signUp(userData: any) {
    return this.http.post(`${this.apiUrl}/users/signup`, userData);
  }

  signIn(userData: any) {
    return this.http.post(`${this.apiUrl}/users/signin`, userData, {
      withCredentials: true,
    });
  }

  checkSignIn() {
    return this.http.get(`${this.apiUrl}/users/logged`, {
      withCredentials: true,
    });
  }
}
