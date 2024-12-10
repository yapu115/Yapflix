import { Component } from '@angular/core';
import { UsersListComponent } from '../components/users-list/users-list.component';
import { BodyComponent } from '../components/body/body.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [UsersListComponent, BodyComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent {
  selectedChat: any = null;
  isSidebarActive: boolean = false; // Indica si el sidebar está activo

  // Lógica para mostrar/ocultar la barra lateral
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  onChatSelected(chat: any) {
    this.selectedChat = chat;
    this.isSidebarActive = false; // Oculta el sidebar después de seleccionar un chat en móviles
  }
}
