import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  // private apiUrl = 'https://yapflix-server.onrender.com/notifications';
  private apiUrl =
    'https://yapflix-server-production.up.railway.app/notifications';

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
