import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserProfileService } from '../user-profile/services/user-profile.service';

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
    protected router: Router
  ) {}

  getUserProfile() {
    this.userProfileService.deleteSearchedUser();
    this.router.navigate(['/user-profile'], {
      queryParams: { refresh: new Date().getTime() },
    });
  }
}
