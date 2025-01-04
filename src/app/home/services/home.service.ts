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
