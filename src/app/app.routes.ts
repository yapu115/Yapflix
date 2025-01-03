import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { authGuard } from './guards/auth.guard';
import { loggedGuard } from './guards/logged.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-up',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'new-post',
    loadComponent: () =>
      import('./home/components/new-post/new-post.component').then(
        (m) => m.NewPostComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./auth/components/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent
      ),
    canActivate: [loggedGuard],
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./auth/components/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
    canActivate: [loggedGuard],
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./chat/chat-page/chat-page.component').then(
        (m) => m.ChatPageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'user-profile',
    loadComponent: () =>
      import('./user-profile/profile-page/profile-page.component').then(
        (m) => m.ProfilePageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'post-view',
    loadComponent: () =>
      import('./user-profile/components/post-view/post-view.component').then(
        (m) => m.PostViewComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: 'notifications',
    loadComponent: () =>
      import('./notifications/notifications.component').then(
        (m) => m.NotificationsComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: 'error',
    loadComponent: () =>
      import('./error/error.component').then((m) => m.ErrorComponent),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./error/error.component').then((m) => m.ErrorComponent),
    canActivate: [authGuard],
  },
];
