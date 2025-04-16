import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersSearchService {
  // private apiUrl = 'https://yapflix-server.onrender.com';
  private apiUrl = 'https://yapflix-server-production.up.railway.app';

  constructor(private http: HttpClient) {}

  getAllUsers(userId: string) {
    return this.http.get(`${this.apiUrl}/users/getAll/${userId}`, {
      withCredentials: true,
    });
  }

  getFollows(userId: string) {
    return this.http.get(`${this.apiUrl}/users/${userId}/followers`, {
      withCredentials: true,
    });
  }

  followUser(userId: string, followUserId: string) {
    return this.http.post(`${this.apiUrl}/users/${userId}/follow`, {
      targetId: followUserId,
    });
  }

  unfollowUser(userId: string, unfollowUserId: string) {
    return this.http.post(`${this.apiUrl}/users/${userId}/unfollow`, {
      targetId: unfollowUserId,
    });
  }
}
