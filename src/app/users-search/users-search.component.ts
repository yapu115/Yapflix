import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersSearchService } from './services/users-search.service';
import { UserService } from '../services/user.service';
import { UserProfileService } from '../user-profile/services/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users-search.component.html',
  styleUrl: './users-search.component.css',
})
export class UsersSearchComponent {
  searchQuery: string = '';
  followedUsers: any = [];
  userId: any;
  users: any = [];
  filteredUsers: any = [];

  constructor(
    protected userSearchService: UsersSearchService,
    protected userService: UserService,
    protected userProfileService: UserProfileService,
    protected router: Router
  ) {
    this.userId = this.userService.getUserId();
    userSearchService.getAllUsers(this.userId).subscribe({
      next: (result: any) => {
        console.log(result.users);
        this.users = result.users;
        this.filteredUsers = [...this.users];
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  onSearch(): void {
    this.filteredUsers = this.users.filter((user: any) =>
      user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  toggleFollow(user: any): void {
    if (user.isFollowing) {
      this.userSearchService.unfollowUser(this.userId, user.id).subscribe({
        next: (result: any) => {
          console.log(result);
          user.isFollowing = false;
        },

        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.userSearchService.followUser(this.userId, user.id).subscribe({
        next: (result: any) => {
          console.log(result);
          user.isFollowing = true;
        },

        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  getUserProfile(user: any) {
    console.log(user);
    this.userProfileService.setSearchedUser(user);
    this.router.navigateByUrl('/user-profile');
  }
}
