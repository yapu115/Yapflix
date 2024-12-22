import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, protected router: Router) {}

  getAllPosts(userId: string) {
    return this.http.get(`${this.apiUrl}/posts/read/${userId}/user`, {
      withCredentials: true,
    });
  }

  getFollowers(userId: string) {
    return this.http.get(`${this.apiUrl}/users/${userId}/followers`);
  }

  getFollowing(userId: string) {
    return this.http.get(`${this.apiUrl}/users/${userId}/following`);
  }
}
