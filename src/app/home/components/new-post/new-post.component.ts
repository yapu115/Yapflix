import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../../services/home.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';
import { LoadingScreenComponent } from '../../../loading-screen/loading-screen.component';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, LoadingScreenComponent],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {
  files: File[] = [];
  images: string[] = [];
  currentImageIndex: number = 0;
  description: string = '';

  userId: any;
  urlMediaImage: string = '';

  // Errors
  picturesError: boolean = false;
  descriptionError: boolean = false;

  picturesMessage: string = '';
  descriptionMessage: string = '';

  constructor(
    protected homeService: HomeService,
    protected userService: UserService,
    protected loadingService: LoadingService,
    protected router: Router
  ) {
    this.userId = userService.getUserId();

    this.urlMediaImage = homeService.getMediaUrl();
    if (this.urlMediaImage) this.images.push(this.urlMediaImage);
    else this.router.navigateByUrl('/home');
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
    postData.append('urlMediaImage', this.urlMediaImage);

    this.loadingService.loading = true;
    this.homeService.sendPost(postData).subscribe({
      next: (response: any) => {
        console.log(response);
        this.homeService.clearMediaUrl();
        this.loadingService.loading = false;
        this.router.navigateByUrl('/home');
      },

      error: (err) => {
        console.log(err);
        this.loadingService.loading = false;
      },
    });
  }
}
