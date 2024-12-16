import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {
  images: string[] = [];
  currentImageIndex: number = 0;
  description: string = '';

  triggerImageUpload(): void {
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput.click();
  }

  getCarouselTransform(): string {
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

  goToImage(index: number): void {
    this.currentImageIndex = index;
  }

  currentIndex: number = 0;

  triggerFileInput() {
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput.click();
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
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
}
