import { CommonModule } from '@angular/common';
import { Component, Input, Query, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeService } from '../../services/home.service';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Media } from '../../../classes/media';
import { NotificationsService } from '../../../notifications/services/notifications.service';
import { LoadingService } from '../../../services/loading.service';
import { LoadingScreenComponent } from '../../../loading-screen/loading-screen.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    SlickCarouselModule,
    CommonModule,
    FormsModule,
    LoadingScreenComponent,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
  schemas: [],
})
export class PostsComponent {
  @Input() showPostOptions: boolean = false;

  newComment: string = '';
  selectedPost: any;

  currentIndex: number[] = [];
  userId: string | any;

  // search
  activateSearch = false;
  searchQuery: string = '';
  mediaType: string = '';

  mediaList: any = [];
  filteredMedia = [...this.mediaList];

  posts: any = [];

  constructor(
    protected homeService: HomeService,
    protected userService: UserService,
    protected notificationsService: NotificationsService,
    protected loadingService: LoadingService,
    protected router: Router
  ) {
    this.loadingService.loading = true;
    this.userId = this.userService.getUserId();
    homeService.getAllPosts().subscribe({
      next: (posts: any) => {
        this.posts.push(...posts);
        this.currentIndex = this.posts.map(() => 0);
        console.log(this.posts);
        this.loadingService.loading = false;
      },

      error: (err) => {},
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showPostOptions']) {
      const currentValue = changes['showPostOptions'].currentValue;
      if (!currentValue) {
        this.activateSearch = currentValue;
        this.searchQuery = '';
        this.filteredMedia = [];
      }
    }
  }

  nextImage(postIndex: number) {
    if (
      this.currentIndex[postIndex] <
      this.posts[postIndex].pictures.length - 1
    ) {
      this.currentIndex[postIndex]++;
    } else {
      this.currentIndex[postIndex] = 0;
    }
  }

  prevImage(postIndex: number) {
    if (this.currentIndex[postIndex] > 0) {
      this.currentIndex[postIndex]--;
    } else {
      this.currentIndex[postIndex] = this.posts[postIndex].pictures.length - 1;
    }
  }

  getCarouselTransform(postIndex: number): string {
    return `translateX(-${this.currentIndex[postIndex] * 100}%)`;
  }

  openComments(post: any) {
    this.selectedPost = post;
  }

  closeModal(event?: MouseEvent) {
    this.selectedPost = null;
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Intl.DateTimeFormat('es-ES', options).format(new Date(date));
  }

  likePost(post: any) {
    this.homeService.sendLike(post.id, this.userId).subscribe({
      next: (result: any) => {
        const message = result.message;
        if (message === 'Post liked') {
          post.likes.push(this.userId);

          if (this.userId !== post.user_id) {
            const notificationData = {
              userId: post.user_id,
              type: 'like',
              content: `${this.userService.getUsername()} liked your post`,
              senderId: this.userId,
            };
            this.notificationsService
              .sendNotification(notificationData)
              .subscribe({
                next: (result: any) => {
                  console.log(result);
                },

                error: (err) => {
                  console.log(err);
                },
              });
          }
        } else {
          post.likes = post.likes.filter((id: any) => id !== this.userId);
        }
      },

      error: (err) => {},
    });
  }

  commentPost(post: any, content: string) {
    this.homeService.sendComment(post.id, this.userId, content).subscribe({
      next: (result: any) => {
        console.log(result);

        if (this.userId !== post.user_id) {
          const notificationData = {
            userId: post.user_id,
            type: 'like',
            content: `${this.userService.getUsername()} commented your post`,
            senderId: this.userId,
          };

          this.notificationsService
            .sendNotification(notificationData)
            .subscribe({
              next: (result: any) => {
                console.log(result);
              },

              error: (err) => {
                console.log(err);
              },
            });
        }

        this.selectedPost.comments.push(result);
      },

      error: (err) => {},
    });
  }

  // apis

  searchMedia(media: string) {
    this.activateSearch = true;
    this.mediaType = media;
  }

  onSearch(): void {
    this.filteredMedia = [];
    this.homeService.searchMedia(this.searchQuery, this.mediaType).subscribe({
      next: (result: any) => {
        console.log(result);

        switch (this.mediaType) {
          case 'movies': {
            this.filteredMedia = result.map((item: any) => {
              return new Media(item.title, item.image, {
                releaseDate: item.releaseDate,
              });
            });
            break;
          }
          case 'music': {
            this.filteredMedia = result.data.map((item: any) => {
              return new Media(item.title, item.album.cover_big, {
                author: item.artist.name,
              });
            });
            break;
          }

          case 'books': {
            this.filteredMedia = result.items.map((item: any) => {
              return new Media(
                item.volumeInfo.title,
                item.volumeInfo.imageLinks?.thumbnail,
                {
                  author: item.volumeInfo.authors,
                }
              );
            });
            break;
          }
          case 'videogames': {
            this.filteredMedia = result
              .filter((item: any) => item.image)
              .map((item: any) => {
                return new Media(item.name, item.image, {
                  releaseDate: item.releaseDate,
                });
              })
              .sort((a: Media, b: Media) => {
                const dateA = a.releaseDate
                  ? new Date(a.releaseDate).getTime()
                  : 0;
                const dateB = b.releaseDate
                  ? new Date(b.releaseDate).getTime()
                  : 0;
                return dateB - dateA;
              });
            break;
          }
        }
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  createNewPost(imageUrl: string) {
    this.homeService.setMediaUrl(imageUrl);
    this.router.navigateByUrl('/new-post');
  }
}
