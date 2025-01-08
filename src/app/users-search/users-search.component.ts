import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersSearchService } from './services/users-search.service';
import { UserService } from '../services/user.service';

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
    protected userService: UserService
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
}
