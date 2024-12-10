import { Component, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent {
  @Input() selectedChat: any;

  constructor(protected userService: UserService) {
    console.log(userService.getUsername());
  }

  messages = [
    { text: 'Hello there!', username: 'Mark Grayson', date: Date() },
    { text: 'How are you?', username: 'yapu_115', date: Date() },
    { text: 'See you later!', username: 'Mark Grayson', date: Date() },
    { text: 'See you later!', username: 'Mark Grayson', date: Date() },
    { text: 'See you later!', username: 'Mark Grayson', date: Date() },
    { text: 'See you later!', username: 'Mark Grayson', date: Date() },
    { text: 'See you later!', username: 'Mark Grayson', date: Date() },
    { text: 'See you later!', username: 'Mark Grayson', date: Date() },
    { text: 'See you later!', username: 'Mark Grayson', date: Date() },
    { text: 'See you later!', username: 'Mark Grayson', date: Date() },
    { text: 'See you later!', username: 'Mark Grayson', date: Date() },
    { text: 'See you later!', username: 'Mark Grayson', date: Date() },
    { text: 'See you later!', username: 'Mark Grayson', date: Date() },
    { text: 'See you later!', username: 'Mark Grayson', date: Date() },
    { text: 'See you later!', username: 'Mark Grayson', date: Date() },
  ];
}
