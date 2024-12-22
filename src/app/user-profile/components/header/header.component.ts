import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() user!: {
    id: string;
    avatar: string;
    username: string;
    bio: string;
    posts: number;
    followers: number;
    following: number;
  };

  @Input() followers!: {
    id: string;
    username: string;
    avatar: string;
  }[];

  @Input() following!: {
    id: string;
    username: string;
    avatar: string;
  }[];

  @Input() postsCount!: number;
}
