import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { map, catchError, of } from 'rxjs';
import { User } from '../classes/user';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const authService = inject(AuthService);

  return authService.checkSignIn().pipe(
    map((response: any) => {
      const { iat, exp, ...user } = response.user;
      const loggedUser = new User(user.id, user.username, user.userAvatar);
      userService.updateUser(loggedUser);
      return true;
    }),
    catchError((err) => {
      userService.updateUser(null);
      router.navigateByUrl('/sign-in');
      return of(false);
    })
  );
};
