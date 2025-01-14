import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/services/auth.service';
import { map, catchError, of } from 'rxjs';
import { User } from '../classes/user';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const authService = inject(AuthService);

  return authService.checkSignIn().pipe(
    map((response: any) => {
      const { iat, exp, ...user } = response.user;
      const loggedUser = new User(user.username, user.id);
      userService.updateUser(loggedUser);
      router.navigateByUrl('/home');
      return false;
    }),
    catchError((err) => {
      console.log(err);
      userService.updateUser(null);
      localStorage.removeItem('savedAvatar');
      return of(true);
    })
  );
};
