import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | null = null;

  constructor(protected authService: AuthService) {}

  getUser() {
    return this.user;
  }

  getUsername() {
    return this.user?.Username;
  }

  getUserId() {
    return this.user?.Id;
  }

  updateUser(updatedUser: User) {
    this.user = updatedUser;
  }
}
