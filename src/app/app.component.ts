import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/services/auth.service';
import { UserService } from './services/user.service';
import { FlexNavComponent } from './flex-nav/flex-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, FlexNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    protected authService: AuthService,
    protected userService: UserService
  ) {}
}
