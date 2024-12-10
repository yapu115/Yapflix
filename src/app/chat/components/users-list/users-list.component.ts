import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  @Output() chatSelected = new EventEmitter<any>();

  chats = [
    {
      name: 'Yapu',
      avatar: 'https://via.placeholder.com/50',
      lastMessage: 'Hello there!',
    },
    {
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/50',
      lastMessage: 'See you later!',
    },
  ];

  selectChat(chat: any) {
    this.chatSelected.emit(chat);
  }
}
