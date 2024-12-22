import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  @Input() userPosts!: {
    pictures: any;
    message: string;
    likes: number;
    date: Date;
    comments: any[];
  }[];

  constructor() {}

  showPost(post: any) {
    console.log(post);
  }
}
