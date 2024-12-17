import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HomeService } from '../../services/home.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {
  files: File[] = [];
  images: string[] = [];
  currentImageIndex: number = 0;
  description: string = '';

  userId: any;

  // Errors
  picturesError: boolean = false;
  descriptionError: boolean = false;

  picturesMessage: string = '';
  descriptionMessage: string = '';

  constructor(
    protected homeService: HomeService,
    protected userService: UserService,
    protected router: Router
  ) {
    this.userId = userService.getUserId();
  }

  triggerFileInput() {
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput.click();
  }

  getCarouselTransform() {
    return `translateX(-${this.currentImageIndex * 100}%)`;
  }

  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage(): void {
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
    }
  }

  goToImage(index: number) {
    this.currentImageIndex = index;
  }

  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        this.files.push(input.files[i]);
      }
      const selectedFiles = Array.from(input.files);
      const totalImages = this.images.length + selectedFiles.length;

      if (totalImages > 8) {
        return;
      }

      selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  createPost() {
    const postData = new FormData();

    this.files.forEach((file) => {
      postData.append('pictures', file);
    });

    postData.append('userId', this.userId);
    postData.append('message', this.description);

    this.homeService.sendPost(postData).subscribe({
      next: (response: any) => {
        console.log(response);
        this.router.navigateByUrl('/home');
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
