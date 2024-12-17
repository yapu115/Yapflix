import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeService } from '../../services/home.service';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [SlickCarouselModule, CommonModule, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
  schemas: [],
})
export class PostsComponent {
  @Input() showPostOptions: boolean = false;

  posts = [
    {
      username: 'Allen the alien',
      userAvatar: '/imgs/tests/posts/2-Allen.jpg',
      images: [
        '/imgs/tests/posts/2-videogame.jpg',
        '/imgs/tests/posts/2-pic2.jpg',
        '/imgs/tests/posts/2-pic3.jpg',
        '/imgs/tests/posts/2-pic4.jpg',
      ],
      message:
        'We can’t thank you enough for all the love and support you’ve shown us this year 🥹You’ve made 2024 unforgettable, and we’re so ready to make 2025 even bigger and better ❤️‍🔥',
      likes: 22,
      date: new Date(),
      comments: [
        {
          user: 'Mark grayson',
          userAvatar: '/imgs/tests/posts/1-mark.jpg',
          message: 'This is a comment',
          date: new Date('2024-12-01T15:00:00'),
        },
        {
          user: 'Mark grayson',
          userAvatar: '/imgs/tests/posts/1-mark.jpg',
          message: 'This is a comment',
          date: new Date('2024-12-01T15:10:00'),
        },
      ],
    },
    {
      username: 'Mark Grayson',
      userAvatar: '/imgs/tests/posts/1-mark.jpg',
      images: [
        '/imgs/tests/posts/1-movie.jpg',
        '/imgs/tests/posts/1-pic2.jpg',
        '/imgs/tests/posts/1-pic3.jpg',
        '/imgs/tests/posts/1-pic4.jpg',
      ],
    },
    {
      username: 'Omniman115',
      userAvatar: '/imgs/tests/posts/4-omniman.jpg',
      images: [
        '/imgs/tests/posts/4-album.jpg',
        '/imgs/tests/posts/4-pic1.jpg',
        '/imgs/tests/posts/4-pic2.jpg',
      ],
    },
    {
      username: 'EveA',
      userAvatar: '/imgs/tests/posts/3-atom_Eve.jpg',
      images: [
        '/imgs/tests/posts/3-book.jpg',
        '/imgs/tests/posts/3-pic2.png',
        '/imgs/tests/posts/3-pic3.jpg',
      ],
    },
  ];

  currentIndex: number[] = [];

  constructor(protected homeService: HomeService) {
    this.currentIndex = this.posts.map(() => 0);
    homeService.getAllPosts().subscribe({
      next: (posts: any) => {
        console.log('User logged successfully:', posts);
        // this.posts.push();
      },

      error: (err) => {},
    });

    // .pipe(
    //   map((posts: any) => {
    //     console.log(posts);
    //     this.posts.push(...posts);
    //   }),
    //   catchError((err) => {
    //     console.log(err);
    //     return of(false);
    //   })
    // );
    // console.log(this.posts);
  }

  nextImage(postIndex: number) {
    if (
      this.currentIndex[postIndex] <
      this.posts[postIndex].images.length - 1
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
      this.currentIndex[postIndex] = this.posts[postIndex].images.length - 1;
    }
  }

  getCarouselTransform(postIndex: number): string {
    return `translateX(-${this.currentIndex[postIndex] * 100}%)`;
  }

  selectedPost: any = null;
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
}
