import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private apiUrl = 'http://localhost:3000/notifications';

  constructor(private http: HttpClient) {}

  sendNotification(notificationData: any) {
    return this.http.post(`${this.apiUrl}/create`, notificationData, {
      withCredentials: true,
    });
  }

  getAllUserNotifications(userId: any) {
    return this.http.get(`${this.apiUrl}/getAll/${userId}`, {
      withCredentials: true,
    });
  }
}
