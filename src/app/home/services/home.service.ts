import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'http://localhost:3000';
  private readonly STORAGE_URL_KEY = 'savedUrl';

  constructor(private http: HttpClient) {}

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

  searchMedia(query: string, mediaType: string) {
    let apiCall;

    switch (mediaType) {
      case 'movies':
        apiCall = this.http.get(`${this.apiUrl}/apis/movies?query=${query}`);
        break;
      case 'videogames':
        apiCall = this.http.get(
          `${this.apiUrl}/apis/videogames?query=${query}`
        );
        break;
      case 'books':
        apiCall = this.http.get(`${this.apiUrl}/apis/books?query=${query}`);
        break;
      case 'music':
        apiCall = this.http.get(`${this.apiUrl}/apis/music?query=${query}`);
        break;
      default:
        throw new Error('Invalid media type');
    }

    return apiCall;
  }
}
