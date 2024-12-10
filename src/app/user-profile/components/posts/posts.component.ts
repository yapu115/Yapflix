import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  @Input() postsData!: { image: string; likes: number; comments: number }[];
}
