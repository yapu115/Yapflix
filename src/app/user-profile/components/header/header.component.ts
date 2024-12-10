import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() user!: {
    avatar: string;
    username: string;
    bio: string;
    posts: number;
    followers: number;
    following: number;
  };
}
