import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  private apiUrl = 'http://localhost:3000/stories';

  constructor(private http: HttpClient) {}

  getAllStories() {
    return this.http.get(`${this.apiUrl}/read`, {
      withCredentials: true,
    });
  }

  postStory(story: any) {
    return this.http.post(`${this.apiUrl}/create`, story);
  }
}
