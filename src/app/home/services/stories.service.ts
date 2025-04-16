import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  // private apiUrl = 'https://yapflix-server.onrender.com/stories';
  private apiUrl = 'https://yapflix-server-production.up.railway.app/stories';

  constructor(private http: HttpClient) {}

  getAllStories(userId: string) {
    return this.http.get(`${this.apiUrl}/${userId}/read`, {
      withCredentials: true,
    });
  }

  postStory(story: any) {
    return this.http.post(`${this.apiUrl}/create`, story);
  }
}
