import { Component } from '@angular/core';
import { NotificationsService } from './services/notifications.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  groupedNotifications: any = [
    { title: 'New', items: [] },
    { title: 'This week', items: [] },
    { title: 'Previous', items: [] },
  ];

  notifications: any = [];

  userId: any;
  constructor(
    protected notificationsService: NotificationsService,
    protected userService: UserService
  ) {
    this.userId = this.userService.getUserId();
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationsService.getAllUserNotifications(this.userId).subscribe({
      next: (response: any) => {
        this.notifications = response.notifications;
        console.log(this.notifications);
        this.groupNotifications();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  groupNotifications() {
    const now = new Date();
    const startOfWeek = this.getStartOfWeek(now);

    this.notifications.forEach((notification: any) => {
      const createdAt = new Date(notification.created_at);

      if (createdAt.toDateString() === now.toDateString()) {
        this.groupedNotifications[0].items.push(notification);
      } else if (createdAt >= startOfWeek) {
        this.groupedNotifications[1].items.push(notification);
      } else {
        this.groupedNotifications[2].items.push(notification);
      }
    });
    console.log(this.groupedNotifications);
  }

  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
}
