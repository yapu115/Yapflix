import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, protected router: Router) {}

  sendPost(postData: any) {
    return this.http.post(`${this.apiUrl}/posts/create`, postData);
  }

  getAllPosts() {
    return this.http.get(`${this.apiUrl}/posts/read`, {
      withCredentials: true,
    });
  }

  sendLike(postId: string, userId: string) {
    return this.http.post(`${this.apiUrl}/posts/${postId}/like`, { userId });
  }

  sendComment(postId: string, userId: string, content: string) {
    return this.http.post(`${this.apiUrl}/posts/${postId}/comments`, {
      userId,
      content,
    });
  }
}
