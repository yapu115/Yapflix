import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = 'http://localhost:3000';
  private selectedPost: any = null;
  public userProfileId: string | undefined;

  constructor(
    private http: HttpClient,
    protected router: Router,
    protected userService: UserService
  ) {
    this.userProfileId = userService.getUserId();
  }

  getSelectedPost() {
    return this.selectedPost;
  }
  setSelectedPost(post: any) {
    this.selectedPost = post;
  }

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
