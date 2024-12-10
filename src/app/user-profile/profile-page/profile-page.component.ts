import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { PostsComponent } from '../components/posts/posts.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [HeaderComponent, PostsComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {
  user = {
    avatar: 'https://via.placeholder.com/120', // URL del avatar
    username: 'John Doe',
    bio: 'Lover of technology, coding, and coffee.',
    posts: 34,
    followers: 1200,
    following: 300,
    postsData: [
      { image: 'https://via.placeholder.com/150', likes: 120, comments: 34 },
      { image: 'https://via.placeholder.com/150', likes: 89, comments: 22 },
      { image: 'https://via.placeholder.com/150', likes: 140, comments: 45 },
    ],
  };
}
