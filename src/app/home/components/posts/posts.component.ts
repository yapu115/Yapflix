import { CommonModule } from '@angular/common';
import { Component, Input, Query } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeService } from '../../services/home.service';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [SlickCarouselModule, CommonModule, RouterLink, FormsModule],
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

  movies: any = [];
  filteredMovies = [...this.movies];

  posts: any = [
    {
      username: 'Allen the alien',
      userAvatar: '/imgs/tests/posts/2-Allen.jpg',
      pictures: [
        {
          url: '/imgs/tests/posts/2-videogame.jpg',
          order: 1,
        },
        {
          url: '/imgs/tests/posts/2-pic2.jpg',
          order: 2,
        },
        {
          url: '/imgs/tests/posts/2-pic3.jpg',
          order: 3,
        },
        {
          url: '/imgs/tests/posts/2-pic4.jpg',
          order: 4,
        },
      ],
      message:
        'We can’t thank you enough for all the love and support you’ve shown us this year 🥹You’ve made 2024 unforgettable, and we’re so ready to make 2025 even bigger and better ❤️‍🔥',
      likes: 22,
      date: new Date(),
      comments: [
        {
          username: 'Mark grayson',
          userAvatar: '/imgs/tests/posts/1-mark.jpg',
          content: 'This is a comment',
          date: new Date('2024-12-01T15:00:00'),
        },
        {
          username: 'Mark grayson',
          userAvatar: '/imgs/tests/posts/1-mark.jpg',
          content: 'This is a comment',
          date: new Date('2024-12-01T15:10:00'),
        },
      ],
    },
  ];

  constructor(
    protected homeService: HomeService,
    protected userService: UserService
  ) {
    this.userId = this.userService.getUserId();
    homeService.getAllPosts().subscribe({
      next: (posts: any) => {
        this.posts.push(...posts);
        this.currentIndex = this.posts.map(() => 0);
      },

      error: (err) => {},
    });
  }

  activePostIndex = 0;

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
          post.likes++;
        } else {
          post.likes--;
        }
      },

      error: (err) => {},
    });
  }

  commentPost(post: any, content: string) {
    this.homeService.sendComment(post.id, this.userId, content).subscribe({
      next: (result: any) => {
        console.log(result);

        this.selectedPost.comments.push(result);
      },

      error: (err) => {},
    });
  }

  // api

  searchMedia(media: string) {
    this.activateSearch = true;
    this.mediaType = media;
  }

  onSearch(): void {
    this.homeService.searchMovie(this.searchQuery).subscribe({
      next: (result: any) => {
        console.log(result.results);
        this.filteredMovies = result.results;
      },

      error: (err) => {
        console.log(err);
      },
    });
    // this.filteredMovies = this.movies.filter((movie: any) =>
    //   movie.title.toLowerCase().includes(query)
    // );
  }
}
