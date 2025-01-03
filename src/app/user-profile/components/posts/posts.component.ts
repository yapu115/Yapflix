import { Component, Input } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { Router } from '@angular/router';

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

  constructor(
    protected userProfileService: UserProfileService,
    protected router: Router
  ) {}

  showPost(post: any) {
    this.userProfileService.setSelectedPost(post);
    this.router.navigateByUrl('/post-view');
  }
}
