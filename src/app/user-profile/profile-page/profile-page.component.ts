import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { PostsComponent } from '../components/posts/posts.component';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';
import { HomeService } from '../../home/services/home.service';
import { UserProfileService } from '../services/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [HeaderComponent, PostsComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {
  user: User | null | any;
  userPosts: any;
  followers: any;
  following: any;

  constructor(
    protected userService: UserService,
    protected homeService: HomeService,
    protected userProfileService: UserProfileService,
    protected router: Router
  ) {
    this.user = userService.getUser();
    this.getPosts();
    this.getFollowers();
    this.getFollowing();
  }

  getPosts() {
    this.userProfileService.getAllPosts(this.user.id).subscribe({
      next: (response: any) => {
        this.userPosts = response;
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  getFollowers() {
    this.userProfileService.getFollowers(this.user.id).subscribe({
      next: (followers: any) => {
        this.followers = followers;
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  getFollowing() {
    this.userProfileService.getFollowing(this.user.id).subscribe({
      next: (following: any) => {
        console.log(following);
        this.following = following;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
