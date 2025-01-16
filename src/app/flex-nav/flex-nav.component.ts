import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserProfileService } from '../user-profile/services/user-profile.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-flex-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './flex-nav.component.html',
  styleUrl: './flex-nav.component.css',
})
export class FlexNavComponent {
  constructor(
    protected userProfileService: UserProfileService,
    protected authService: AuthService,
    protected router: Router
  ) {}

  getUserProfile() {
    this.userProfileService.deleteSearchedUser();
    this.router.navigate(['/user-profile'], {
      queryParams: { refresh: new Date().getTime() },
    });
  }

  isModalOpen = false;

  openLogoutModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  logout() {
    console.log('Signing out...');
    this.authService.signOut().subscribe({
      next: (response: any) => {
        console.log(response);
        this.isModalOpen = false;
        localStorage.removeItem('savedAvatar');
        this.router.navigate(['/sign-in']);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
