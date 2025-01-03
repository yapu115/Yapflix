import { Component } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../../home/services/home.service';

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.css',
})
export class PostViewComponent {
  userPosts: any[] = [];
  selectedPostIndex: number = 0;

  newComment: string = '';
  selectedPost: any;

  currentIndex: number[] = [];
  userId: string | any;

  activePostIndex = 0;

  user: any;

  constructor(
    protected userProfileService: UserProfileService,
    protected homeService: HomeService,
    protected userService: UserService
  ) {
    this.user = this.userService.getUser();
    this.userId = this.userService.getUserId();
    this.getPosts();
  }

  getPosts() {
    console.log(this.userId);
    this.userProfileService.getAllPosts(this.userId).subscribe({
      next: (response: any) => {
        this.userPosts = response;
        this.selectedPostIndex = this.userProfileService.getSelectedPost();
        this.currentIndex = this.userPosts.map(() => 0);

        setTimeout(() => {
          this.scrollToSelectedPost();
        }, 100);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  scrollToSelectedPost(): void {
    const targetElement = document.getElementById(
      this.selectedPostIndex.toString()
    );

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  nextImage(postIndex: number) {
    if (
      this.currentIndex[postIndex] <
      this.userPosts[postIndex].pictures.length - 1
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
      this.currentIndex[postIndex] =
        this.userPosts[postIndex].pictures.length - 1;
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

  addComment(): void {
    if (!this.selectedPost) return;

    const newCommentObject = {
      user: 'UsuarioActual',
      userAvatar: '/imgs/defaults/avatar.png',
      date: new Date(),
      message: this.newComment.trim(),
    };

    this.selectedPost.comments.push(newCommentObject);

    this.newComment = '';
  }
}
