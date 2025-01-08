import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllStories() {
    return this.http.get(`${this.apiUrl}/stories/read`, {
      withCredentials: true,
    });
  }

  // getAllStories(userId: string) {
  //   return this.http.get(`${this.apiUrl}/stories/read/${userId}/user`, {
  //     withCredentials: true,
  //   });
  // }

  postStory(story: any) {
    return this.http.post(`${this.apiUrl}/stories/create`, story);
  }
}
