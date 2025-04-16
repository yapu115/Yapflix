import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  // private apiUrl = 'https://yapflix-server.onrender.com';
  private apiUrl = 'https://yapflix-server-production.up.railway.app';

  private readonly STORAGE_URL_KEY = 'savedUrl';

  constructor(private http: HttpClient) {}

  sendPost(postData: any) {
    return this.http.post(`${this.apiUrl}/posts/create`, postData);
  }

  getAllPosts(userId: string) {
    return this.http.get(`${this.apiUrl}/posts/${userId}/read`, {
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

  searchMedia(query: string, mediaType: string) {
    return this.http.get(`${this.apiUrl}/apis/${mediaType}?query=${query}`);
  }

  // Media storage

  setMediaUrl(url: string): void {
    localStorage.setItem(this.STORAGE_URL_KEY, url);
  }

  getMediaUrl(): string {
    const imageUrl = localStorage.getItem(this.STORAGE_URL_KEY);
    if (imageUrl) return imageUrl;
    return 'no image found';
  }

  clearMediaUrl(): void {
    localStorage.removeItem(this.STORAGE_URL_KEY);
  }
}
