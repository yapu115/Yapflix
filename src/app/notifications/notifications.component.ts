import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  notifications = [
    {
      title: 'New',
      items: [
        {
          photo: 'https://via.placeholder.com/50',
          message: 'jonel0l started following you.',
          date: '15h',
        },
      ],
    },
    {
      title: 'Yesterday',
      items: [
        {
          photo: 'https://via.placeholder.com/50',
          message: '5kfans.foryou_800 started following you.',
          date: '1d',
        },
      ],
    },
    {
      title: 'This week',
      items: [
        {
          photo: 'https://via.placeholder.com/50',
          message: 's_yzd16 started following you.',
          date: '3d',
        },
        {
          photo: 'https://via.placeholder.com/50',
          message: 'zoe_olmos92 started following you.',
          date: '3d',
        },
      ],
    },
  ];
}
