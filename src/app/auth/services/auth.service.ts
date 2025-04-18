import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'https://yapflix-server.onrender.com/users';
  private apiUrl = 'https://yapflix-server-production.up.railway.app/users';

  constructor(private http: HttpClient, protected router: Router) {}

  signUp(userData: any) {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  signIn(userData: any) {
    return this.http.post(`${this.apiUrl}/signin`, userData, {
      withCredentials: true,
    });
  }

  signOut() {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  checkSignIn() {
    return this.http.get(`${this.apiUrl}/logged`, {
      withCredentials: true,
    });
  }
}
